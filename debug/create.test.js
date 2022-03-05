const db = require("./libs/firebase");
const algolia = require("./libs/algolia");
const formats = require("./formats");
const functions = require("./functions");

const data = {
  index: "companys",
  user: 0,
  post: { min: 0, max: 10 },
};

(async () => {
  for (let i = 0; i < data.user; i++) {
    const uid = functions.uid();

    const objectIDs =
      data.index === "companys" ? await createPost(uid) : undefined;

    await createUser(uid, objectIDs);
  }
})();

const createPost = async (uid) => {
  const objectIDs = { matters: [], resources: [] };

  for await (const key of Object.keys(objectIDs)) {
    const index = algolia.initIndex(key);
    const posts = [];
    const total = data.post.max - data.post.min + data.post.min;

    for (let i = 0; i < Math.floor(Math.random() * total); i++) {
      if (key === "matters") {
        posts.push(formats.algolia.matter(uid));
      }

      if (key === "resources") {
        posts.push(formats.algolia.resource(uid));
      }
    }

    const results = await index.saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true,
    });

    objectIDs[key] = [...results.objectIDs.reverse()];
  }

  return objectIDs;
};

const createUser = async (uid, objectIDs) => {
  const index = algolia.initIndex(data.index);

  const doc = await db.collection(data.index).doc(uid).get();

  if (!doc.exists) {
    const user =
      data.index === "companys"
        ? formats.firestore.company(uid, objectIDs)
        : formats.firestore.person(uid);

    await doc.ref.set(user, { merge: true });

    await index.partialUpdateObject(
      data.index === "companys"
        ? formats.algolia.company(uid, user)
        : formats.algolia.person(uid, user),
      {
        createIfNotExists: true,
      }
    );
  }
};
