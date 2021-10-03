const functions = require("firebase-functions");

exports.stripe = require("stripe")(functions.config().stripe.secret_key);
