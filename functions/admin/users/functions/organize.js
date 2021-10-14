const db = require("../../../firebase").db;
const algolia = require("../../../algolia").algolia;

exports.organize = async ({ data, user }) => {
  const lists =
    data.index === "companys"
      ? {
          posts: {},
          follows: [],
          home: [],
          likes: {},
          outputs: {},
          entries: {},
        }
      : data.index === "persons" && {
          entries: [],
          likes: [],
          history: [],
          follows: [],
          home: [],
          requests: {},
        };

  for await (const list of Object.keys(lists)) {
    if (data.index !== "persons") {
      if (list === "follows" || list === "home") {
        if (user[list][0]) {
          const index = algolia.initIndex("companys");
          const objectIDs = await index
            .getObjects(user[list])
            .then(({ results }) => {
              return results.map((hit) => hit && hit.objectID);
            })
            .catch((e) => {});

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
            })
            .catch((e) => {});
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
              })
              .catch((e) => {});

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
              })
              .catch((e) => {});
          } else {
            lists[list][i] = [];
          }
        }
      }
    } else {
      if (list === "requests") {
        if (user[list][0]) {
          const index = algolia.initIndex("companys");

          const objectIDs = await index
            .getObjects(user[list].map((request) => request.uid))
            .then(({ results }) => {
              return results.map((hit) => hit && hit.objectID);
            })
            .catch((e) => {});

          await db
            .collection(data.index)
            .doc(data.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const objects = doc
                  .data()
                  [list].filter(
                    (request) => objectIDs.indexOf(request.uid) > -1
                  );

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
            })
            .catch((e) => {});
        } else {
          lists[list] = [];
        }
      } else {
        for await (const i of Object.keys(user[list])) {
          if (user[list][i][0]) {
            const index = algolia.initIndex("companys");
            const objectIDs = await index
              .getObjects(user[list][i])
              .then(({ results }) => {
                return results.map((hit) => hit && hit.objectID);
              })
              .catch((e) => {});

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
              })
              .catch((e) => {});
          } else {
            lists[list][i] = [];
          }
        }
      }
    }
  }

  return lists;
};
