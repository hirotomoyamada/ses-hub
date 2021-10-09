// 全体
exports.enableAgree = require("./users/agree").enableAgree;
exports.disableAgree = require("./users/agree").disableAgree;

// メール
exports.contactPromotion = require("./mail/contactPromotion").contactPromotion;

// ユーザー
exports.login = require("./users/login").login;

exports.createUser = require("./users/createUser").createUser;
exports.enableUser = require("./users/enableUser").enableUser;
exports.disableUser = require("./users/disableUser").disableUser;
exports.declineUser = require("./users/declineUser").declineUser;
exports.returnUser = require("./users/returnUser").returnUser;
exports.deleteUser = require("./users/deleteUser").deleteUser;

exports.createProfile = require("./users/createProfile").createProfile;

// 投稿
exports.fetchPosts = require("./posts/fetchPosts").fetchPosts;
