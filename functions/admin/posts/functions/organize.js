const db = require("../../../firebase").db;
const algolia = require("../../../algolia").algolia;

exports.organize = async ({ data, user }) => {
  const lists = { posts: {}, follows: [], likes: {}, outputs: {}, entries: {} };

  for await (const list of Object.keys(lists)) {
    if (list === "follows") {
      if (user[list][0]) {
        const index = algolia.initIndex("companys");
        const objectIDs = await index
          .getObjects(user[list])
          .then(({ results }) => {
            return results.map((hit) => hit && hit.objectID);
          });

        await db
          .collection(data.index)
          .doc(data.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const objects = doc
                .data()
                [list].filter((objectID) => objectIDs.indexOf(objectID) > -1);

              lists[list] = objects;

              doc.ref
                .set(
                  {
                    [list]: [...objects],
                  },
                  { merge: true }
                )
                .catch((e) => {});
            }
          });
      } else {
        lists[list] = [];
      }
    } else {
      for await (const i of Object.keys(user[list])) {
        if (user[list][i][0]) {
          const index = algolia.initIndex(i);
          const objectIDs = await index
            .getObjects(user[list][i])
            .then(({ results }) => {
              return results.map((hit) => hit && hit.objectID);
            });

          await db
            .collection(data.index)
            .doc(data.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const objects = doc
                  .data()
                  [list][i].filter(
                    (objectID) => objectIDs.indexOf(objectID) > -1
                  );

                lists[list][i] = objects;

                doc.ref
                  .set(
                    {
                      [list]: { [i]: [...objects] },
                    },
                    { merge: true }
                  )
                  .catch((e) => {});
              }
            });
        } else {
          lists[list][i] = [];
        }
      }
    }
  }

  return lists;
};