const value = require("./value");
const data = require("../create");

module.exports = (uid) => ({
  display: ["public", "private"][Math.floor(Math.random() * 2)],
  roman: {
    firstName: ["MAKOTO", "SEKAI", "KOTONOHA", "YUKINA", "HIROTOMO"][
      Math.floor(Math.random() * 5)
    ],
    lastName: ["ITO", "SATO", "KATO", "YAMADA", "SUZUKI"][
      Math.floor(Math.random() * 5)
    ],
  },
  position: value.position[Math.floor(Math.random() * value.position.length)],
  sex: ["男性", "女性"][Math.floor(Math.random() * 2)],
  age: Math.floor(Math.random() * (48 - 18) + 18),
  body: "これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。",
  belong: [
    "株式会社div",
    "株式会社bar",
    "株式会社fuga",
    "株式会社hoge",
    "株式会社span",
  ][Math.floor(Math.random() * 5)],
  station: ["渋谷駅", "大宮駅", "品川駅", "恵比寿駅", "新宿駅"][
    Math.floor(Math.random() * 5)
  ],
  period: {
    year: "2021",
    month: Math.floor(Math.random() * 12 + 1),
  },
  costs: {
    min: Math.floor(Math.random() * 100 + 1),
    max: Math.floor(Math.random() * 200 + 1),
    contract: Math.floor(Math.random() * 200 + 1),
    display: ["public", "private"][Math.floor(Math.random() * 2)],
    type: ["スキル見合", "上振れ", "応談"][Math.floor(Math.random() * 3)],
  },
  handles: [...Array(Math.floor(Math.random() * 5 + 1))].map(
    () =>
      [...value.handles].splice(
        Math.floor(Math.random() * [...value.handles].length),
        1
      )[0]
  ),
  tools: [...Array(Math.floor(Math.random() * 5 + 1))].map(
    () =>
      [...value.tools].splice(
        Math.floor(Math.random() * [...value.tools].length),
        1
      )[0]
  ),
  skills: [...Array(Math.floor(Math.random() * 5 + 1))].map(
    () =>
      [...value.requires].splice(
        Math.floor(Math.random() * [...value.requires].length),
        1
      )[0]
  ),
  parallel: ["あり", "なし"][Math.floor(Math.random() * 2)],
  note: [
    "これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。",
    "",
  ][Math.floor(Math.random() * 2)],
  status: ["新規", "提案中", "面談中", "フォロー中", "保留中", "成約"][
    Math.floor(Math.random() * 6)
  ],
  memo: {
    name: "伊藤誠",
    tel: "012-3456-7890",
    address: "東京都港区芝公園４丁目２−８",
  },
  uid: uid,
  createAt:
    data.createAt + 60 * 60 * 1000 * Math.floor(Math.random() * 528 + 1),
});
