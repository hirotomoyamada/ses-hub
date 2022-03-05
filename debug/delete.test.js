const admin = require("firebase-admin");
const db = require("./libs/firebase");

const data = {
  index: "companys",
  value: [""],
};

(async () => {
  const score = { success: 0, error: 0 };

  const querySnapshot = await db
    .collection(data.index)
    .get()
    .catch((e) => {
      console.log(e.message);
    });

  if (!querySnapshot) {
    throw Error();
  }

  for (const doc of querySnapshot.docs) {
    await doc.ref
      .update(
        typeof data.value === "string"
          ? {
              [data.value]: admin.firestore.FieldValue.delete(),
            }
          : {
              [data.value[0]]: {
                [data.value[1]]: admin.firestore.FieldValue.delete(),
              },
            }
      )
      .then(() => {
        score.success++;
        console.log(doc.id, "is Successed", "firestore");
      })
      .catch((e) => {
        score.error++;
        console.log(doc.id, "is Error :", e.message, "firestore");
      });
  }

  console.log(
    "Finished!",
    "firestore (",
    "success :",
    score.success,
    "error :",
    score.error,
    ")"
  );
})();
