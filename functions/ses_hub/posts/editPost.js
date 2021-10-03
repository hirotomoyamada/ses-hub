const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
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
      });

    if (context.auth.uid === data.post.uid) {
      const dataTime = Date.now();
      const costs = {
        min: Number(data.post.costs.min),
        max: Number(data.post.costs.max),
        contract: Number(data.post.costs.contract),
        display: data.post.costs.display,
        type: data.post.costs.type,
      };

      const index = algolia.initIndex(data.index);
      const object =
        data.index === "matters"
          ? {
              display: data.post.display,
              objectID: data.post.objectID,
              title: data.post.title,
              position: data.post.position,
              body: data.post.body,
              location: data.post.location,
              period: data.post.period,
              costs: costs,
              adjustment: data.post.adjustment,
              times: data.post.times,
              handles: data.post.handles,
              tools: data.post.tools,
              requires: data.post.requires,
              prefers: data.post.prefers,
              interviews: data.post.interviews,
              remote: data.post.remote,
              distribution: data.post.distribution,
              span: data.post.span,
              note: data.post.note,
              status: data.post.status,
              memo: data.post.memo,
              updateAt: dataTime,
            }
          : data.index === "resources" && {
              display: data.post.display,
              objectID: data.post.objectID,
              roman: data.post.roman,
              position: data.post.position,
              sex: data.post.sex,
              age: data.post.age,
              body: data.post.body,
              belong: data.post.belong,
              station: data.post.station,
              period: data.post.period,
              costs: costs,
              handles: data.post.handles,
              tools: data.post.tools,
              skills: data.post.skills,
              parallel: data.post.parallel,
              note: data.post.note,
              status: data.post.status,
              memo: data.post.memo,
              updateAt: dataTime,
            };

      await index.partialUpdateObject(object).catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "投稿の編集に失敗しました",
          "algolia"
        );
      });

      return;
    }
  });
