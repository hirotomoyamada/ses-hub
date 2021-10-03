const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.extractPosts = functions
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

    const index = algolia.initIndex(data.index);
    const objectIDs =
      data.type === "follows"
        ? data.user[data.type]
        : data.user[data.type][data.index];
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
        const res = results.map((hit) =>
          hit && data.index === "matters"
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
            : hit && data.index === "resources"
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
            : hit && data.index === "companys"
            ? {
                uid: hit.objectID,
                name: hit.name,
                person: hit.person,
                position: hit.position,
                body: hit.body,
                email: hit.email,
                tel: hit.tel,
                postal: hit.postal,
                address: hit.address,
                url: hit.url,
                social: hit.social,
                more: hit.more,
                region: hit.region,
              }
            : hit &&
              data.index === "persons" && {
                uid: hit.objectID,
              }
        );
        return res.filter((res) => res);
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
        await db
          .collection(data.index)
          .doc(posts[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (data.index === "companys") {
                posts[i].icon = doc.data().icon;
                posts[i].cover = doc.data().cover;
                posts[i].status = doc.data().status;
                posts[i].provider = doc.data().provider;
                posts[i].agree = doc.data().agree;
                posts[i].posts = doc.data().posts;
                posts[i].likes = doc.data().likes;
                posts[i].outputs = doc.data().outputs;
                posts[i].entries = doc.data().entries;
                posts[i].follows = doc.data().follows;
                posts[i].createAt = doc.data().createAt;
                posts[i].updateAt = doc.data().updateAt;
                posts[i].lastLogin = doc.data().lastLogin;
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
      }
    }
    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });
