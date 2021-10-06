// 全体
exports.enableAgree = require("./users/agree").enableAgree;
exports.disableAgree = require("./users/agree").disableAgree;

// メール
exports.contactPromotion = require("./mail/contactPromotion").contactPromotion;

// 支払い
exports.fetchProducts = require("./pay/fetchProducts").fetchProducts;
exports.createCheckout = require("./pay/createCheckout").createCheckout;
exports.createPayment = require("./pay/createPayment").createPayment;
exports.updateTaxBehavior =
  require("./pay/updateTaxBehavior").updateTaxBehavior;
exports.createPlan = require("./pay/createPlan").createPlan;
exports.updatePlan = require("./pay/updatePlan").updatePlan;
exports.createOption = require("./pay/createOption").createOption;
exports.updateOption = require("./pay/updateOption").updateOption;
exports.disableNotice = require("./pay/disableNotice").disableNotice;
exports.updateNotice = require("./pay/updateNotice").updateNotice;

// ユーザー
exports.login = require("./users/login").login;

exports.createUser = require("./users/createUser").createUser;
exports.enableUser = require("./users/enableUser").enableUser;
exports.disableUser = require("./users/disableUser").disableUser;
exports.declineUser = require("./users/declineUser").declineUser;
exports.returnUser = require("./users/returnUser").returnUser;
exports.deleteUser = require("./users/deleteUser").deleteUser;

exports.createProfile = require("./users/createProfile").createProfile;
exports.editProfile = require("./users/editProfile").editProfile;
exports.changeEmail = require("./users/changeEmail").changeEmail;
exports.addProvider = require("./users/addProvider").addProvider;

exports.showUser = require("./users/showUser").showUser;

exports.addLike = require("./users/like").addLike;
exports.removeLike = require("./users/like").removeLike;
exports.addOutput = require("./users/output").addOutput;
exports.removeOutput = require("./users/output").removeOutput;
exports.addFollow = require("./users/follow").addFollow;
exports.removeFollow = require("./users/follow").removeFollow;
exports.updateHome = require("./users/home").updateHome;
exports.addEntry = require("./users/entry").addEntry;

// 投稿
exports.promotionPosts = require("./posts/promotionPosts").promotionPosts;
exports.fetchPosts = require("./posts/fetchPosts").fetchPosts;
exports.userPosts = require("./posts/userPosts").userPosts;
exports.extractPosts = require("./posts/extractPosts").extractPosts;
exports.followsPosts = require("./posts/followsPosts").followsPosts;
exports.showPost = require("./posts/showPost").showPost;

exports.createPost = require("./posts/createPost").createPost;
exports.sendPost = require("./posts/sendPost").sendPost;
exports.editPost = require("./posts/editPost").editPost;
exports.deletePost = require("./posts/deletePost").deletePost;
