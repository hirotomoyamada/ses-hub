export const timestamp = (
  t: number,
  d: "month" | "day" | undefined = undefined
): string => {
  const unix = new Date(t);
  const year = unix.getFullYear();
  const month = ("0" + String(unix.getMonth() + 1)).slice(-2);
  const date = ("0" + String(unix.getDate())).slice(-2);
  const hours = ("0" + String(unix.getHours())).slice(-2);
  const minutes = ("0" + String(unix.getMinutes())).slice(-2);
  return !d
    ? `${year}年${month}月${date}日 ${hours}時${minutes}分`
    : d !== "month"
    ? `${year}年${month}月${date}日`
    : `${year}年${month}月`;
};
