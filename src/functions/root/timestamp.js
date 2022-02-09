export const timestamp = (t, d) => {
  const unix = new Date(t);
  const year = unix.getFullYear();
  const month = ("0" + (unix.getMonth() + 1)).slice(-2);
  const date = ("0" + unix.getDate()).slice(-2);
  const hours = ("0" + unix.getHours()).slice(-2);
  const minutes = ("0" + unix.getMinutes()).slice(-2);
  return !d
    ? `${year}年${month}月${date}日 ${hours}時${minutes}分`
    : d !== "month"
    ? `${year}年${month}月${date}日`
    : `${year}年${month}月`;
};
