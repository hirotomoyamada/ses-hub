const db = require("../../../firebase").db;
const algolia = require("../../../algolia").algolia;

exports.organize = async ({ data, user }) => {
  const lists = initLists(data.index);

  for await (const list of Object.keys(lists)) {
    await updateLists({ data: data, user: user, lists: lists, list: list });
  }

  return lists;
};

const initLists = (index) => {
  return index === "companys"
    ? {
        posts: {},
        follows: [],
        home: [],
        likes: {},
        outputs: {},
        entries: {},
      }
    : index === "persons" && {
        entries: [],
        likes: [],
        histories: [],
        follows: [],
        home: [],
        requests: {},
      };
};

const updateLists = async ({ data, user, lists, list }) => {
  if (Array.isArray(lists[list])) {
    user[list].length && (await updateFirestore({ data, lists, list }));
  } else {
    for await (const i of Object.keys(user[list])) {
      user[list][i].length &&
        (await updateFirestore({ data: data, lists: lists, list: list, i: i }));
    }
  }
};

const fetchAlgolia = async ({ data, user, list, i }) => {
  const index = algolia.initIndex(
    list === "follows" || list === "home" || list === "requests"
      ? "companys"
      : data.index !== "persons"
      ? i
      : "matters"
  );

  const { results } = await index.getObjects(i ? user[list][i] : user[list]);

  return results?.map((hit) => hit && hit.objectID);
};

const updateFirestore = async ({ data, user, lists, list, i }) => {
  const objectIDs = await fetchAlgolia({
    data: data,
    user: user,
    list: list,
    i: i,
  });

  const doc = await db.collection(data.index).doc(data.uid).get();

  if (doc.exists) {
    const before = i ? doc.data()[list][i] : doc.data()[list];
    
    const after = before.filter((objectID) => objectIDs.indexOf(objectID) > -1);

    Object.assign(i ? lists[list][i] : lists[list], ...after);

    doc.ref
      .set({ [list]: i ? { [i]: [...after] } : [...after] }, { merge: true })
      .catch((e) => {});
  }
};
