const crypto = require("crypto");

exports.timestamp = () => {
  const n = Date.now();
  const d = 60 * 60 * 1000 * 24;
  const r = Math.floor(Math.random() * 28 + 1);
  return n - d * r;
};

exports.uid = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 28;
  return Array.from(crypto.randomBytes(28))
    .map((n) => S[n % S.length])
    .join("");
};
