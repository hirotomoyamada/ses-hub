const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
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
    const index = algolia.initIndex("persons");

    await db
      .collection("persons")
      .doc(uid)
      .get()
      .then(async (doc) => {
        const key = doc.data().resume.key;

        const name = `${key}.pdf`;
        const bucket = storage.bucket("ses-hub-resume");
        const path = bucket.file(name);

        await db.collection("persons").doc(uid).delete();

        await index.deleteObject(uid);
        
        if (key) {
          await path.delete();
        }
      });

    return;
  });
