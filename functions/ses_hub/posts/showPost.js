const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.showPost = functions
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
    const post = await index
      .getObject(data.objectID)
      .then((hit) => {
        return hit && data.index === "matters" && hit.uid === context.auth.uid
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
              status: hit.status !== "成約" && true,
              uid: hit.uid,
              createAt: hit.createAt,
              updateAt: hit.updateAt,
            }
          : data.index === "resources" && hit.uid === context.auth.uid
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
          : data.index === "resources" &&
            hit.display === "public" &&
            status && {
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
              status: hit.status !== "成約" && true,
              uid: hit.uid,
              createAt: hit.createAt,
              updateAt: hit.updateAt,
            };
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    await db
      .collection("companys")
      .doc(post.uid)
      .get()
      .then((doc) => {
        post.user = {
          uid: doc.id,
          icon: doc.data().icon,
          profile: {
            name: doc.data().profile.name,
            person: doc.data().profile.person,
            body: doc.data().profile.body,
            email: doc.data().profile.email,
            social: doc.data().profile.social,
          },
        };
      });

    const handles = post?.handles?.map((t) => t[Object.keys(t)]);
    const value = await handles?.join(" ");

    const bests = await index
      .search("", {
        queryLanguages: ["ja", "en"],
        similarQuery: value,
        filters: "display:public",
        hitsPerPage: 100,
      })

      .then(({ hits }) => {
        return hits.map((hit) =>
          data.index === "matters" &&
          hit.uid === context.auth.uid &&
          hit.objectID !== post.objectID
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
                memo: hit.memo,
                status: hit.status,
                uid: hit.uid,
                createAt: hit.createAt,
                updateAt: hit.updateAt,
              }
            : data.index === "matters" &&
              hit.objectID !== post.objectID &&
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
            : data.index === "resources" &&
              hit.uid === context.auth.uid &&
              hit.objectID !== post.objectID
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
            : data.index === "resources" &&
              hit.objectID !== post.objectID &&
              status && {
                objectID: hit.objectID,
                roman: hit.roman,
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
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    return { post: post, bests: bests };
  });
