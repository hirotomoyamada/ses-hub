exports.timestamp = (year, month, date) => {
  return new Date(year, month - 1, date).getTime();
};

exports.uid = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 28;
  return Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
};
