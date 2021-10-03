const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.deleteUser = functions
  .region(location)
  .runWith(runtime)
  .auth.user()
  .onDelete(async (user) => {
    const uid = user.uid;
    const companys = algolia.initIndex("companys");
    const matters = algolia.initIndex("matters");
    const resources = algolia.initIndex("resources");

    await db
      .collection("companys")
      .doc(uid)
      .get()
      .then(async (doc) => {
        const posts = doc.data().posts;

        await db.collection("companys").doc(uid).delete();
        await db.collection("customers").doc(uid).delete();

        await companys.deleteObject(uid);

        if (posts.matters[0]) {
          await matters.deleteObjects(posts.matters);
        }

        if (posts.resources[0]) {
          await resources.deleteObjects(posts.resources);
        }
      });

    return;
  });
