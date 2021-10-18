const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const algolia = require("../../algolia").algolia;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const timeZone = require("../../firebase").timeZone;

const timestamp = require("./functions/timestamp").timestamp;

exports.persons = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async (context) => {
    const target = "persons";

    const index = await algolia.initIndex(target);
    const path = `${target}/${timestamp()}.json`;
    const bucket = storage.bucket("ses-hub-posts").file(path);

    let json = [];

    await index.browseObjects({
      batch: (objects) => {
        json = JSON.stringify(objects, null, 2);
      },
    });

    await bucket.save(json);
  });
