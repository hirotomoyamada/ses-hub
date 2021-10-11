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

exports.fetchUser = require("./users/fetchUser").fetchUser;

exports.addLike = require("./users/like").addLike;
exports.removeLike = require("./users/like").removeLike;
exports.addFollow = require("./users/follow").addFollow;
exports.removeFollow = require("./users/follow").removeFollow;
exports.updateHome = require("./users/home").updateHome;
exports.addEntry = require("./users/entry").addEntry;

// 投稿
exports.fetchPosts = require("./posts/fetchPosts").fetchPosts;
exports.homePosts = require("./posts/homePosts").homePosts;
exports.fetchPost = require("./posts/fetchPost").fetchPost;
exports.userPosts = require("./posts/userPosts").userPosts;
