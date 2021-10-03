const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    const user = await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .then((doc) => {
        return doc.exists && data.index === "companys"
          ? {
              index: data.index,
              uid: data.uid,
              icon: doc.data().icon,
              cover: doc.data().cover,
              status: doc.data().status,
              payment: doc.data().payment,
              agree: doc.data().agree,
              provider: doc.data().provider,
              createAt: doc.data().createAt,
              updateAt: doc.data().updateAt,
              lastLogin: doc.data().lastLogin,

              follows: doc.data().follows,
              posts: doc.data().posts,
              outputs: doc.data().outputs,
              likes: doc.data().likes,
              entries: doc.data().entries,

              name: doc.data().profile.name,
              person: doc.data().profile.person,
              position: doc.data().profile.position,
              body: doc.data().profile.body,
              more: doc.data().profile.more,
              region: doc.data().profile.region,
              postal: doc.data().profile.postal,
              address: doc.data().profile.address,
              tel: doc.data().profile.tel,
              email: doc.data().profile.email,
              social: doc.data().profile.social,
            }
          : doc.exists &&
              data.index === "persons" && {
                index: data.index,
                uid: data.uid,
                icon: doc.data().icon,
                cover: doc.data().cover,
                status: doc.data().status,
                agree: doc.data().agree,
                provider: doc.data().provider,
                createAt: doc.data().createAt,
                updateAt: doc.data().updateAt,
                lastLogin: doc.data().lastLogin,

                follows: doc.data().follows,
                likes: doc.data().likes,
                entries: doc.data().entries,

                name: doc.data().profile.name,
                email: doc.data().profile.email,
              };
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    const lists =
      data.index === "companys"
        ? ["posts", "follows", "likes", "outputs", "entries"]
        : data.index === "persons" && ["follows", "likes", "entries"];

    lists.forEach(async (list) => {
      if (list === "follows") {
        if (user[list][0]) {
          const index = algolia.initIndex("companys");
          const objectIDs = await index
            .getObjects(user[list])
            .then(({ results }) => {
              return results.map((hit) => hit && hit.objectID);
            });
          db.collection(data.index)
            .doc(data.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const objects = doc
                  .data()
                  [list].filter((objectID) => objectIDs.indexOf(objectID) > -1);

                doc.ref
                  .set(
                    {
                      [list]: [...objects],
                    },
                    { merge: true }
                  )
                  .catch((e) => {
                    throw new functions.https.HttpsError(
                      "data-loss",
                      "出力の削除に失敗しました",
                      "firebase"
                    );
                  });
              }
            });
        }
      } else {
        Object.keys(user[list]).forEach(async (i) => {
          if (user[list][i][0]) {
            const index = algolia.initIndex(i);
            const objectIDs = await index
              .getObjects(user[list][i])
              .then(({ results }) => {
                return results.map((hit) => hit && hit.objectID);
              });

            db.collection(data.index)
              .doc(data.uid)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const objects = doc
                    .data()
                    [list][i].filter(
                      (objectID) => objectIDs.indexOf(objectID) > -1
                    );

                  doc.ref
                    .set(
                      {
                        [list]: { [i]: [...objects] },
                      },
                      { merge: true }
                    )
                    .catch((e) => {
                      throw new functions.https.HttpsError(
                        "data-loss",
                        "出力の削除に失敗しました",
                        "firebase"
                      );
                    });
                }
              });
          }
        });
      }
    });

    return user;
  });
