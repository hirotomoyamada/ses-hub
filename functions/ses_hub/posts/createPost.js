const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;

exports.createPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated(context);

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
            uid: context.auth.uid,
            createAt: dataTime,
          }
        : data.index === "resources" && {
            display: data.post.display,
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
            uid: context.auth.uid,
            createAt: dataTime,
          };

    await index
      .saveObject(object, { autoGenerateObjectIDIfNotExist: true })
      .then(async (post) => {
        object.objectID = post.objectID;

        await db
          .collection("companys")
          .doc(context.auth.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const posts = doc.data().posts?.[data.index];
              doc.ref.set(
                posts
                  ? {
                      posts: { [data.index]: [post.objectID, ...posts] },
                    }
                  : { posts: { [data.index]: [post.objectID] } },
                { merge: true }
              );
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError("firebase", e.message);
          });
      })
      .catch((e) => {
        throw new functions.https.HttpsError("algolia", e.message);
      });

    return { index: data.index, post: object };
  });
