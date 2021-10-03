const admin = require("firebase-admin");
admin.initializeApp();

exports.db = admin.firestore();
exports.auth = admin.auth();
exports.storage = admin.storage();

exports.location = "asia-northeast1";
exports.runtime = {
  timeoutSeconds: 300,
  memory: "1GB",
};
exports.timeZone = "Asia/Tokyo";
