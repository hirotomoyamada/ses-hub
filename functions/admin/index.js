/**********************************
 * アカウント に関する処理
 **********************************/

exports.login = require("./root/login").login;
exports.editData = require("./root/editData").editData;
exports.sendMail = require("./root/sendMail").sendMail;
exports.updateUser = require("./root/updateUser").updateUser;

/**********************************
 * 案件・人材 に関する処理
 **********************************/

exports.fetchPosts = require("./posts/fetchPosts").fetchPosts;
exports.editPost = require("./posts/editPost").editPost;
exports.deletePost = require("./posts/deletePost").deletePost;

/**********************************
 * 営業・エンジニアに関する処理
 **********************************/

exports.fetchUser = require("./users/fetchUser").fetchUser;
exports.editUser = require("./users/editUser").editUser;
exports.extractPosts = require("./users/extractPosts").extractPosts;

/**********************************
 * 職務経歴書に関する処理
 **********************************/

exports.uploadResume = require("./users/uploadResume").uploadResume;
exports.deleteResume = require("./users/deleteResume").deleteResume;
