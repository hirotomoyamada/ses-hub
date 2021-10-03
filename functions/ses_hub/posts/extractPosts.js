const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().payment.status === "canceled") {
          return false;
        }

        return true;
      });

    const index = algolia.initIndex(data.index);

    const objectIDs = data.objectIDs;

    const hitsPerPage = 50;

    const hit = {
      posts: objectIDs.length,
      pages: Math.ceil(objectIDs.length / 50),
      currentPage: data.page ? data.page : 0,
    };

    const posts = await index
      .getObjects(
        objectIDs.slice(
          hit.currentPage * hitsPerPage,
          hitsPerPage * (hit.currentPage + 1)
        )
      )
      .then(({ results }) => {
        return results.map((hit) =>
          hit && data.index === "matters" && hit.uid === context.auth.uid
            ? {
                display: hit.display,
                objectID: hit.objectID,
                title: hit.title,
                position: hit.position,
                body: hit.body,
                location: hit.location,
                period: hit.period,
                costs: hit.costs,
                adjustment: hit.adjustment,
                times: hit.times,
                handles: hit.handles,
                tools: hit.tools,
                requires: hit.requires,
                prefers: hit.prefers,
                interviews: hit.interviews,
                remote: hit.remote,
                distribution: hit.distribution,
                span: hit.span,
                note: hit.note,
                status: hit.status,
                memo: hit.memo,
                uid: hit.uid,
                createAt: hit.createAt,
                updateAt: hit.updateAt,
              }
            : hit &&
              data.index === "matters" &&
              hit.display === "public" &&
              status
            ? {
                objectID: hit.objectID,
                title: hit.title,
                position: hit.position,
                body: hit.body,
                location: hit.location,
                period: hit.period,
                costs:
                  hit.costs.display === "public"
                    ? {
                        display: hit.costs.display,
                        min: hit.costs.min,
                        max: hit.costs.max,
                      }
                    : {
                        display: hit.costs.display,
                        type: hit.costs.type,
                      },
                adjustment: hit.adjustment,
                times: hit.times,
                handles: hit.handles,
                tools: hit.tools,
                requires: hit.requires,
                prefers: hit.prefers,
                interviews: hit.interviews,
                remote: hit.remote,
                distribution: hit.distribution,
                span: hit.span,
                note: hit.note,
                uid: hit.uid,
                createAt: hit.createAt,
                updateAt: hit.updateAt,
              }
            : hit && data.index === "resources" && hit.uid === context.auth.uid
            ? {
                display: hit.display,
                objectID: hit.objectID,
                roman: hit.roman,
                position: hit.position,
                sex: hit.sex,
                age: hit.age,
                body: hit.body,
                belong: hit.belong,
                station: hit.station,
                period: hit.period,
                costs: hit.costs,
                handles: hit.handles,
                tools: hit.tools,
                skills: hit.skills,
                parallel: hit.parallel,
                note: hit.note,
                status: hit.status,
                memo: hit.memo,
                uid: hit.uid,
                createAt: hit.createAt,
                updateAt: hit.updateAt,
              }
            : hit &&
              data.index === "resources" &&
              hit.display === "public" &&
              status
            ? {
                objectID: hit.objectID,
                roman: {
                  firstName: hit.roman.firstName.substring(0, 1),
                  lastName: hit.roman.lastName.substring(0, 1),
                },
                position: hit.position,
                sex: hit.sex,
                age: hit.age,
                body: hit.body,
                belong: hit.belong,
                station: hit.station,
                period: hit.period,
                costs:
                  hit.costs.display === "public"
                    ? {
                        display: hit.costs.display,
                        min: hit.costs.min,
                        max: hit.costs.max,
                      }
                    : {
                        display: hit.costs.display,
                        type: hit.costs.type,
                      },
                handles: hit.handles,
                tools: hit.tools,
                skills: hit.skills,
                parallel: hit.parallel,
                note: hit.note,
                uid: hit.uid,
                createAt: hit.createAt,
                updateAt: hit.updateAt,
              }
            : hit &&
              data.index === "companys" &&
              hit.status === "enable" &&
              status && {
                uid: hit.objectID,
                profile: {
                  name: hit.name,
                  person: hit.person,
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
      });

    if (data.index === "companys" || data.index === "persons") {
      for (let i = 0; i < posts.length; i++) {
        posts[i] &&
          (await db
            .collection(data.index)
            .doc(posts[i].uid)
            .get()
            .then((doc) => {
              posts[i].icon = doc.data().icon;
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

    return { index: data.index, posts: posts, hit: hit };
  });
