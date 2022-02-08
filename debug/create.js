const db = require("./firebase");
const algolia = require("./algolia");

const matters = require("./posts/matters");
const resources = require("./posts/resources");
const companys = require("./posts/companys");
const persons = require("./posts/persons");

const functions = require("./functions/functions");

const data = {
  index: "companys",
  createAt: functions.timestamp(2021, 10, 1),
  user: 10,
  post: { min: 8, max: 15 },
};

(async function create() {
  for (let i = 0; i < data.user; i++) {
    const uid = functions.uid();

    const objectIDs = data.index === "companys" && (await createPost(uid));
    await createUser(uid, objectIDs);
  }
})();

const createPost = async (uid) => {
  const objectIDs = { matters: [], resources: [] };

  for await (const post of Object.keys(objectIDs)) {
    const index = algolia.initIndex(post);
    const posts = [];

    for (
      let i = 0;
      i <
      Math.floor(
        Math.random() * (data.post.max - data.post.min) + data.post.min
      );
      i++
    ) {
      posts.push(
        post === "matters"
          ? matters(uid)
          : post === "resources" && resources(uid)
      );
    }

    await index
      .saveObjects(posts, { autoGenerateObjectIDIfNotExist: true })
      .then((results) => {
        objectIDs[post] = [...results.objectIDs.reverse()];
      });
  }

  return objectIDs;
};

const createUser = async (uid, objectIDs) => {
  const index = algolia.initIndex(data.index);

  await db
    .collection(data.index)
    .doc(uid)
    .get()
    .then(async (doc) => {
      if (!doc.exists) {
        const user =
          data.index === "companys"
            ? companys({ uid: uid, objectIDs: objectIDs })
            : data.index === "persons" && persons({ uid: uid });

        await doc.ref.set(user, { merge: true });

        await index.partialUpdateObject(
          data.index === "companys"
            ? companys({ uid: uid, user: user })
            : data.index === "persons" && persons({ uid: uid, user: user }),
          {
            createIfNotExists: true,
          }
        );
      }
    });
};

exports.data = data;
