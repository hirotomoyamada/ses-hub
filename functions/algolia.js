const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

exports.algolia = algoliasearch(
  functions.config().algolia.application_id,
  functions.config().algolia.admin_api_key
);
