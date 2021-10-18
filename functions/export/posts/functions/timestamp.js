exports.timestamp = () => {
  const unix = new Date(Date.now());
  const year = unix.getFullYear();
  const month = ("0" + (unix.getMonth() + 1)).slice(-2);
  const date = ("0" + unix.getDate()).slice(-2);
  const hours = ("0" + unix.getHours()).slice(-2);
  const minutes = ("0" + unix.getMinutes()).slice(-2);
  const seconds = ("0" + unix.getSeconds()).slice(-2);

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
};
