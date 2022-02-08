const value = require("./value");
const data = require("../create");

module.exports = ({ uid, user }) => {
  if (!user) {
    const createAt =
      data.createAt + 60 * 60 * 1000 * Math.floor(Math.random() * 528 + 1);
    return {
      icon: `icon${Math.floor(Math.random() * (36 - 18) + 18)}`,
      cover: `cover${Math.floor(Math.random() * 19)}`,
      provider: [["password"], ["google.com"], ["twitter.com"], ["github.com"]][
        Math.floor(Math.random() * 4)
      ],
      profile: {
        nickName: `${
          value.lastNickName[
            Math.floor(Math.random() * value.lastNickName.length)
          ]
        }${
          value.firstNickName[
            Math.floor(Math.random() * value.firstNickName.length)
          ]
        }`,
        state: ["案件探し中", "確定", "商談", "内容次第", "至急", "情報収集"][
          Math.floor(Math.random() * 6)
        ],
        name: `${
          value.lastName[Math.floor(Math.random() * value.lastName.length)]
        }${
          value.firstName[Math.floor(Math.random() * value.firstName.length)]
        }`,
        email: `${uid}@gmail.com`,
        age: Math.floor(Math.random() * (48 - 18) + 18),
        sex: ["男性", "女性"][Math.floor(Math.random() * 2)],
        position:
          value.position[Math.floor(Math.random() * value.position.length)],
        location:
          value.location[Math.floor(Math.random() * value.location.length)],
        handles: [...Array(Math.floor(Math.random() * 8 + 1))].map(
          () =>
            [...value.handles].splice(
              Math.floor(Math.random() * [...value.handles].length),
              1
            )[0]
        ),

        body: [
          "これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。",
          "",
        ][Math.floor(Math.random() * 2)],
        tools: [...Array(Math.floor(Math.random() * 8 + 1))].map(
          () =>
            [...value.tools].splice(
              Math.floor(Math.random() * [...value.tools].length),
              1
            )[0]
        ),
        skills: [...Array(Math.floor(Math.random() * 5 + 1))].map(
          () =>
            [...value.skills].splice(
              Math.floor(Math.random() * [...value.skills].length),
              1
            )[0]
        ),
        urls: [
          [],
          [`https://${uid}.github.io/portfolio`],
          [`https://${uid}.com`, `https://${uid}.github.io/portfolio`],
          [
            `https://${uid}.com`,
            `https://${uid}.github.io/portfolio`,
            `https://${uid}.co.jp`,
          ],
        ][Math.floor(Math.random() * 4)],
        costs: {
          min: Math.floor(Math.random() * 100 + 1),
          max: Math.floor(Math.random() * (200 - 101) + 101),
          display: ["public", "private"][Math.floor(Math.random() * 2)],
          type: ["内容次第", "応談"][Math.floor(Math.random() * 2)],
        },
        resident: ["常駐可", "リモート希望", "どちらでも", ""][
          Math.floor(Math.random() * 4)
        ],
        working: [Math.floor(Math.random() * 5 + 1), ""][
          Math.floor(Math.random() * 2)
        ],
        clothes: ["カジュアル", "スーツ可", "スーツNG", ""][
          Math.floor(Math.random() * 4)
        ],
        period: [
          {
            year: "",
            month: "",
          },
          {
            year: "2021",
            month: Math.floor(Math.random() * 12 + 1),
          },
        ][Math.floor(Math.random() * 2)],
      },
      entries: [],
      likes: [],
      requests: {
        enable: [],
        hold: [],
        disable: [],
      },
      follows: [],
      home: [],
      history: [],
      resume: {
        key: `${uid}-${Math.random().toString(32).substring(2)}`,
        url: "https://storage.googleapis.com/ses-hub-resume-i1iqe/mwttg6s1JZOHSXETwlbguNcovPd2-ov1cjk2p87o.pdf",
      },
      agree: "enable",
      status: ["enable", "hold", "disable"][Math.floor(Math.random() * 3)],
      createAt: createAt,
      lastLogin: createAt,
    };
  } else {
    return {
      objectID: uid,
      uid: uid,
      status: user.status,
      state: user.state,
      name: user.profile.name,
      nickName: user.profile.nickName,
      email: user.profile.email,

      age: user.profile.age,
      sex: user.profile.sex,
      position: user.profile.position,
      location: user.profile.location,
      handles: user.profile.handles,

      body: user.profile.body,
      tools: user.profile.tools,
      skills: user.profile.skills,
      urls: user.profile.urls,
      costs: user.profile.costs,
      working: user.profile.working,
      clothes: user.profile.clothes,
      resident: user.profile.resident,
      period: user.profile.period,

      createAt: user.createAt,
      lastLogin: user.createAt,
    };
  }
};
