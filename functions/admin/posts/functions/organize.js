const functions = require("firebase-functions");
const db = require("../../../firebase").db;
const algolia = require("../../../algolia").algolia;

exports.organize = ({ index, uid, user }) => {
  const lists =
    index === "companys"
      ? ["posts", "follows", "likes", "outputs", "entries"]
      : index === "persons" && ["follows", "likes", "entries"];

  lists.forEach(async (list) => {
    if (list === "follows") {
      if (user[list][0]) {
        const index = algolia.initIndex("companys");
        const objectIDs = await index
          .getObjects(user[list])
          .then(({ results }) => {
            return results.map((hit) => hit && hit.objectID);
          });
        db.collection(index)
          .doc(uid)
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

          db.collection(index)
            .doc(uid)
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
};
