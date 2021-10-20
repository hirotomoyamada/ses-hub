const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, canceled: true });
    const demo = context.auth.uid === functions.config().demo.ses_hub.uid;

    const index = algolia.initIndex(data.index);
    const user = await index
      .getObject(data.uid)
      .then((hit) => {
        return hit && data.index === "companys"
          ? {
              uid: hit.objectID,
              profile: {
                name: hit.name,
                person: hit.person,
                body: hit.body,
                postal: hit.postal,
                address: hit.address,
                tel: !demo ? hit.tel : null,
                email: !demo ? hit.email : null,
                more: hit.more,
                region: hit.region,
                url: !demo ? hit.url : null,
                social: !demo ? hit.social : {},
              },
              createAt: hit.createAt,
            }
          : data.index === "persons" && {
              uid: hit.objectID,
              profile: {
                nickName: hit.nickName,
                name: !demo ? hit.name : null,
                email: !demo ? hit.email : null,
                age: hit.age,
                sex: hit.sex,
                position: hit.position,
                location: hit.location,
                handles: hit.handles,
                body: hit.body,
                tools: hit.tools,
                skills: hit.skills,
                urls: !demo ? hit.urls : [],
                costs: hit.costs,
                working: hit.working,
                resident: hit.resident,
                clothes: hit.clothes,
                period: hit.period,
              },
              createAt: hit.createAt,
            };
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "プロフィールの取得に失敗しました",
          "algolia"
        );
      });

    await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          user.icon = doc.data().icon;
          user.cover = doc.data().cover;

          if (
            data.index === "persons" &&
            doc.data().requests.enable.indexOf(context.auth.uid) < 0
          ) {
            user.profile.name = null;
            user.profile.email = null;
            user.profile.urls = [];
            user.profile.working = null;
            user.profile.resident = null;
            user.profile.clothes = null;
          }
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    const bests =
      data.index === "persons" &&
      (await index
        .search("", {
          queryLanguages: ["ja", "en"],
          similarQuery: user?.handles?.join(" "),
          filters: "status:enable",
          hitsPerPage: 100,
        })

        .then(({ hits }) => {
          return hits.map(
            (hit) =>
              hit.objectID !== user.uid && {
                uid: hit.objectID,
                profile: {
                  nickName: hit.nickName,
                  position: hit.position,
                  age: hit.age,
                  sex: hit.sex,
                  handles: hit.handles,
                  costs: hit.costs,
                  period: hit.period,
                  location: hit.location,
                  body: hit.body,
                },
              }
          );
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "投稿の取得に失敗しました",
            "algolia"
          );
        }));

    if (data.index === "persons") {
      for (let i = 0; i < bests.length; i++) {
        bests[i] &&
          (await db
            .collection(data.index)
            .doc(bests[i].uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                if (doc.data().profile.nickName) {
                  bests[i].icon = doc.data().icon;
                } else {
                  bests[i] = false;
                }
              }
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "not-found",
                "ユーザーの取得に失敗しました",
                "firebase"
              );
            }));
      }
    }

    return { user: user, bests: bests };
  });
