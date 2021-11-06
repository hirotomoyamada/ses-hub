exports.dummy = (d, i) => {
  switch (d) {
    case "name":
      return company[Math.floor(Math.random() * company.length)];
    case "person":
      return `${lastName[Math.floor(Math.random() * lastName.length)]}${
        firstName[Math.floor(Math.random() * firstName.length)]
      }`;
    case "email":
      return email[Math.floor(Math.random() * email.length)];
    case "urls":
      return [...Array(Math.floor(Math.random() * i + 1))].map(
        () =>
          [...urls].splice(Math.floor(Math.random() * [...urls].length), 1)[0]
      );
    default:
      return;
  }
};

const company = [
  "株式会社div",
  "株式会社bar",
  "株式会社fuga",
  "株式会社hoge",
  "株式会社span",
];

const lastName = [
  "佐藤",
  "鈴木",
  "高橋",
  "田中",
  "伊藤",
  "渡辺",
  "山本",
  "中村",
  "小林",
  "加藤",
  "吉田",
  "山田",
  "佐々木",
  "山口",
  "松本",
  "井上",
  "木村",
  "林",
  "斉藤",
  "清水",
];

const firstName = [
  "太郎",
  "次郎",
  "翔太",
  "拓也",
  "高貴",
  "翔",
  "正明",
  "剛",
  "純也",
  "清二",
  "ジョンソン",
  "健",
  "旬",
  "寛文",
  "ケンシロウ",
  "結衣",
  "真奈",
  "舞華",
  "衣世",
  "幸奈",
  "グリコ",
  "玲緒奈",
  "真衣",
  "真紀子",
  "愛佳",
  "ジェシカ",
  "百花",
  "あゆみ",
  "由利恵",
  "里帆",
  "果穂",
  "風香",
];

const email = [
  "miseruwakeganai@gmail.com",
  "dameyo-damedame@dame.co.jp",
  "watasi-ha-yamada@yamada.com",
  "tousen-omedetougozaimasu@tousen.mail",
  "oreoreoreoreore-sagi@gmail.com",
];

const urls = [
  "https://dummy.com",
  "https://zettai-misenasen.co.jp",
  "https://mireru-wakega-nai.net",
  "https://sadako.github.io/portfolio",
  "https://sonnani_mitaino.net",
  "https://koreo-mitara-sinu.me",
  "https://dame_zettai.com",
];
