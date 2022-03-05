import * as functions from "firebase-functions";
import { algolia } from "../algolia";
import * as Firestore from "../types/firestore";
import * as Algolia from "../types/algolia";

export type List = {
  company: {
    posts: Firestore.Company["posts"];
    follows: Firestore.Company["follows"];
    likes: Firestore.Company["likes"];
    home: Firestore.Company["home"];
    outputs: Firestore.Company["outputs"];
    entries: Firestore.Company["entries"];
  };

  person: {
    follows: Firestore.Person["follows"];
    likes: Firestore.Person["likes"];
    home: Firestore.Person["home"];
    entries: Firestore.Person["entries"];
    histories: Firestore.Person["histories"];
    requests: Firestore.Person["requests"];
  };
};

export const dataOrganize = async (
  index: "companys" | "persons",
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company | Firestore.Person>
): Promise<List["company"] | List["person"]> => {
  const list = initList(index);

  for await (const key of Object.keys(list)) {
    await updateList({ index: index, doc: doc, list: list, key: key });
  }

  return list;
};

const initList = (
  index: "companys" | "persons"
): List["company"] | List["person"] => {
  return index === "companys"
    ? {
        posts: { matters: [], resources: [] },
        follows: [],
        home: [],
        likes: { matters: [], resources: [], persons: [] },
        outputs: { matters: [], resources: [] },
        entries: { matters: [], resources: [], persons: [] },
      }
    : {
        entries: [],
        likes: [],
        histories: [],
        follows: [],
        home: [],
        requests: { enable: [], hold: [], disable: [] },
      };
};

const updateList = async ({
  index,
  doc,
  list,
  key,
}: {
  index: "companys" | "persons";
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company | Firestore.Person>;
  list: List["company"] | List["person"];
  key: string;
}): Promise<void> => {
  if (index === "companys") {
    const user = doc.data();

    if (!user) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    if ("posts" in user) {
      const type = user[key as keyof List["company"]];

      if (type instanceof Array) {
        if (type.length) {
          await updateFirestore({
            doc: doc,
            list: list,
            key: key,
            before: type,
          });
        }
      } else {
        for await (const i of Object.keys(type)) {
          if ("persons" in type) {
            const objectIDs =
              type[i as keyof List["company"]["likes" | "entries"]];

            if (objectIDs.length) {
              await updateFirestore({
                doc: doc,
                list: list,
                key: key,
                i: i,
                before: objectIDs,
              });
            }
          } else {
            const objectIDs =
              type[i as keyof List["company"]["posts" | "outputs"]];

            if (objectIDs.length) {
              await updateFirestore({
                doc: doc,
                list: list,
                key: key,
                i: i,
                before: objectIDs,
              });
            }
          }
        }
      }
    }
  }

  if (index === "persons") {
    const user = doc.data();

    if (!user) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    if ("requests" in user) {
      const type = user[key as keyof List["person"]];

      if (type instanceof Array) {
        if (type.length) {
          await updateFirestore({
            doc: doc,
            list: list,
            key: key,
            before: type,
          });
        }
      } else {
        for await (const i of Object.keys(type)) {
          const ObjectIDs = type[i as keyof List["person"]["requests"]];

          if (ObjectIDs.length) {
            await updateFirestore({
              doc: doc,
              list: list,
              key: key,
              i: i,
              before: ObjectIDs,
            });
          }
        }
      }
    }
  }
};

const fetchAlgolia = async ({
  key,
  i,
  before,
}: {
  key: string;
  i?: string;
  before: string[];
}): Promise<string[]> => {
  const index = algolia.initIndex(
    key === "follows" || key === "home" || key === "requests"
      ? "companys"
      : i
      ? i
      : "matters"
  );

  const { results } = await index.getObjects<
    Algolia.Matter | Algolia.Resource | Algolia.Company | Algolia.Person
  >(before);

  return results
    .map((hit) => hit && hit.objectID)
    ?.filter((objectID) => objectID) as string[];
};

const updateFirestore = async ({
  doc,
  list,
  key,
  i,
  before,
}: {
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company | Firestore.Person>;
  list: List["company"] | List["person"];
  key: string;
  i?: string;
  before: string[];
}): Promise<void> => {
  const objectIDs = await fetchAlgolia({
    key: key,
    i: i,
    before: before,
  });

  const after = before.filter((objectID) => objectIDs.indexOf(objectID) > -1);

  if ("posts" in list) {
    Object.assign(i ? list[key as keyof List["company"]] : list, {
      [i ? i : key]: [...after],
    });
  } else {
    Object.assign(i ? list[key as keyof List["person"]] : list, {
      [i ? i : key]: [...after],
    });
  }

  await doc.ref
    .set(
      {
        [key]: i ? { [i]: [...after] } : [...after],
      },
      { merge: true }
    )
    .catch(() => {});
};
