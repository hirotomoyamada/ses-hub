const db = require("./libs/firebase");
const algolia = require("./libs/algolia");

const data = {
  index: "companys",
  firestore: true,
  algolia: true,
  value: { profile: { tel: "0120-123-456" } },
};

(async () => {
  const index = algolia.initIndex(data.index);

  const score = {
    firestore: { success: 0, error: 0 },
    algolia: { success: 0, error: 0 },
  };

  const querySnapshot =
    data.index === "companys" || data.index === "persons"
      ? await db
          .collection(data.index)
          .get()
          .catch((e) => {
            console.log(e.message);
          })
      : await index
          .search()
          .then(async ({ nbPages }) => {
            const docs = [];
            for (let page = 0; page < nbPages; page++) {
              await index.search("", { page: page }).then(({ hits }) => {
                docs.push(...hits);
              });
            }

            return { docs };
          })
          .catch((e) => {
            console.log(e.message);
          });

  if (!querySnapshot) {
    throw Error();
  }

  for (const doc of querySnapshot.docs) {
    if (
      data.firestore &&
      data.index !== "matters" &&
      data.index !== "resources"
    ) {
      await doc.ref
        .set(data.value, { merge: true })
        .then(() => {
          score.firestore.success++;
          console.log(doc.id, "is Successed", "firestore");
        })
        .catch((e) => {
          score.firestore.error++;
          console.log(doc.id, "is Error :", e.message, "firestore");
        });
    }

    if (data.algolia) {
      const objectID = {
        objectID:
          data.index === "companys" || data.index === "persons"
            ? doc.id
            : doc.objectID,
      };

      await index
        .partialUpdateObject(
          "profile" in data.value && typeof data.value.profile === "object"
            ? {
                ...objectID,
                ...data.value.profile,
              }
            : {
                ...objectID,
                ...data.value,
              },
          {
            createIfNotExists: false,
          }
        )
        .then(() => {
          score.algolia.success++;
          console.log(
            "id" in doc ? doc.id : doc.objectID,
            "is Successed",
            "algolia"
          );
        })
        .catch((e) => {
          score.algolia.error++;
          console.log(
            "id" in doc ? doc.id : doc.objectID,
            "is Error :",
            e.message,
            "algolia"
          );
        });
    }
  }

  if (data.firestore && data.algolia) {
    console.log(
      "Finished!",
      "firestore (",
      "success :",
      score.firestore.success,
      "error :",
      score.firestore.error,
      ")",
      "algolia (",
      "success :",
      score.algolia.success,
      "error :",
      score.algolia.error,
      ")"
    );
  } else if (data.firestore) {
    console.log(
      "Finished!",
      "firestore (",
      "success :",
      score.firestore.success,
      "error :",
      score.firestore.error,
      ")"
    );
  } else if (data.algolia) {
    console.log(
      "Finished!",
      "algolia (",
      "success :",
      score.algolia.success,
      "error :",
      score.algolia.error,
      ")"
    );
  }
})();
