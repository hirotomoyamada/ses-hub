import * as functions from "firebase-functions";

export const userAuthenticated = async (
  context: functions.https.CallableContext
) => {
  if (context.auth?.uid !== functions.config().admin.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なユーザーのため、処理中止",
      "firebase"
    );
  }
};
