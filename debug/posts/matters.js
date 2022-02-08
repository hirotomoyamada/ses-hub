const value = require("./value");
const data = require("../create");

module.exports = (uid) => ({
  display: ["public", "private"][Math.floor(Math.random() * 2)],
  title: value.title[Math.floor(Math.random() * value.title.length)],
  position: value.position[Math.floor(Math.random() * value.position.length)],
  body: "これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。",
  location: {
    area: value.area[Math.floor(Math.random() * value.area.length)],
    place: value.place[Math.floor(Math.random() * value.place.length)],
  },
  period: {
    year: "2021",
    month: Math.floor(Math.random() * 12 + 1),
  },
  costs: {
    min: Math.floor(Math.random() * 100 + 1),
    max: Math.floor(Math.random() * (200 - 101) + 101),
    contract: Math.floor(Math.random() * 200 + 1),
    display: ["public", "private"][Math.floor(Math.random() * 2)],
    type: ["スキル見合", "上振れ", "応談"][Math.floor(Math.random() * 3)],
  },
  adjustment: ["140h 〜 180h", "160h 〜 200h", "140h 〜 200h", "その他"][
    Math.floor(Math.random() * 4)
  ],
  times: {
    start: ["09:00", "10:00", "11:00"][Math.floor(Math.random() * 3)],
    end: ["17:00", "18:00", "19:00"][Math.floor(Math.random() * 3)],
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
  requires: [...Array(Math.floor(Math.random() * 3 + 1))].map(
    () =>
      [...value.requires].splice(
        Math.floor(Math.random() * [...value.requires].length),
        1
      )[0]
  ),
  prefers: [...Array(Math.floor(Math.random() * 3 + 1))].map(
    () =>
      [...value.prefers].splice(
        Math.floor(Math.random() * [...value.prefers].length),
        1
      )[0]
  ),
  interviews: {
    type: ["オンライン", "現地", "その他"][Math.floor(Math.random() * 3)],
    count: ["1回", "2回", "その他"][Math.floor(Math.random() * 3)],
  },
  remote: ["あり", "なし", "その他", "状況による"][
    Math.floor(Math.random() * 4)
  ],
  distribution: ["プライム", "二次請け", "三次請け", "営業支援", "その他"][
    Math.floor(Math.random() * 5)
  ],
  span: [30, 45, 50, 60, "その他"][Math.floor(Math.random() * 5)],
  approval: ["当日中", "翌営業1日以内", "翌営業3日以内", "不明"][
    Math.floor(Math.random() * 4)
  ],
  note: [
    "これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。これはデモの備考です。",
    "",
  ][Math.floor(Math.random() * 2)],
  status: ["新規", "提案中", "面談中", "フォロー中", "保留中", "成約"][
    Math.floor(Math.random() * 6)
  ],
  uid: uid,
  createAt:
    data.createAt + 60 * 60 * 1000 * Math.floor(Math.random() * 528 + 1),
});
