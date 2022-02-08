const admin = require("firebase-admin");
const db = require("./firebase");

const data = {
  index: "companys",
  value: "test",
};

(async function del() {
  const score = { success: 0, error: 0 };

  const { docs } = await db
    .collection(data.index)
    .get()
    .catch((e) => {
      console.log(e.message);
    });

  for (const doc of docs) {
    await doc.ref
      .update({
        [data.value]: admin.firestore.FieldValue.delete(),
      })
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
    score.firestore.success,
    "error :",
    score.firestore.error,
    ")"
  );
})();
