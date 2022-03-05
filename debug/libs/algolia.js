const algoliasearch = require("algoliasearch");

module.exports = algoliasearch(
  process.env.REACT_APP_APPLICATION_ID,
  process.env.REACT_APP_ADMIN_API_KEY
);
