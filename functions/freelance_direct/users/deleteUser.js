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
    const persons = algolia.initIndex("persons");

    await db
      .collection("persons")
      .doc(uid)
      .get()
      .then(async (doc) => {
        await db.collection("persons").doc(uid).delete();

        await persons.deleteObject(uid);
      });

    return;
  });
