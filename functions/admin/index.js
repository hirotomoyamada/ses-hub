exports.login = require("./root/login").login;
exports.editData = require("./root/editData").editData;
exports.sendMail = require("./root/sendMail").sendMail;
exports.updateUser = require("./root/updateUser").updateUser;

exports.fetchPosts = require("./posts/fetchPosts").fetchPosts;
exports.editPost = require("./posts/editPost").editPost;
exports.deletePost = require("./posts/deletePost").deletePost;

exports.fetchUser = require("./users/fetchUser").fetchUser;
exports.editUser = require("./users/editUser").editUser;
exports.extractPosts = require("./users/extractPosts").extractPosts;

exports.uploadResume = require("./users/uploadResume").uploadResume;
exports.deleteResume = require("./users/deleteResume").deleteResume;
