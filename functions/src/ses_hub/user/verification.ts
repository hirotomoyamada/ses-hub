import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import * as Firestore from "../../types/firestore";
type Data = {
  type: string;
  email: string;
};

export const verificationUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data) => {
    data.type && (await verificationType(data));

    return;
  });

const verificationType = async (data: Data): Promise<void> => {
  const querySnapshot = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .get();

  querySnapshot?.forEach((doc) => {
    if (
      doc.data().profile?.email === data.email &&
      doc.data().type === data.type
    ) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }
  });

  return;
};
