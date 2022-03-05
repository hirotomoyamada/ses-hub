const value = require("./_value");
const functions = require("../functions");

exports.firestore = {
  company: (uid, objectIDs) => {
    const status = ["active", "trialing", "canceled"][
      Math.floor(Math.random() * 3)
    ];

    const createAt = functions.timestamp();

    return {
      icon: `icon${Math.floor(Math.random() * 17 + 1)}`,
      cover: `cover${Math.floor(Math.random() * 18 + 1)}`,
      provider: [["password"], ["google.com"], ["twitter.com"], ["github.com"]][
        Math.floor(Math.random() * 4)
      ],
      profile: {
        name: [
          "株式会社div",
          "株式会社bar",
          "株式会社fuga",
          "株式会社hoge",
          "株式会社span",
        ][Math.floor(Math.random() * 5)],
        person: `${
          value.lastName[Math.floor(Math.random() * value.lastName.length)]
        }${
          value.firstName[Math.floor(Math.random() * value.firstName.length)]
        }`,
        position: "メンバー",
        body: [
          "これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。これはデモの概要です。",
          null,
        ][Math.floor(Math.random() * 2)],
        postal: `${Math.floor(Math.random() * (999 - 100) + 100)}-${Math.floor(
          Math.random() * (9999 - 1000) + 1000
        )}`,
        address:
          value.address[Math.floor(Math.random() * value.address.length)],
        email: `${uid}@gmail.com`,
        tel: `${["090", "080"][Math.floor(Math.random() * 2)]}-${Math.floor(
          Math.random() * (9999 - 1000) + 1000
        )}-${Math.floor(Math.random() * (9999 - 1000) + 1000)}`,
        more: ["案件元", "人材元"][Math.floor(Math.random() * 2)],
        region: [...Array(Math.floor(Math.random() * 3 + 1))].map(
          () =>
            [...value.region].splice(
              Math.floor(Math.random() * [...value.region].length),
              1
            )[0]
        ),
        url: [null, `https://${uid}.com`][Math.floor(Math.random() * 2)],
        social: {
          twitter: [null, `https://twitter.com/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          instagram: [null, `https://instagram.com/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          line: [null, `https://line.me/ti/p/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          linkedIn: [null, `https://linkedin.com/in/${uid}`][
            Math.floor(Math.random() * 2)
          ],
        },
      },
      posts: { matters: objectIDs.matters, resources: objectIDs.resources },
      entries: { matters: [], resources: [], persons: [] },
      likes: { matters: [], resources: [], persons: [] },
      outputs: { matters: [], resources: [] },
      follows: [],
      home: [],
      agree: "enable",
      status: "enable",
      type: "individual",
      payment:
        status !== "canceled"
          ? [
              {
                status: status,
                limit: Math.floor(Math.random() * 10 + 1),
                load: false,
                cancel: [true, false][Math.floor(Math.random() * 2)],
                price: `price_${uid}`,
                start: createAt,
                end:
                  createAt +
                  60 *
                    60 *
                    1000 *
                    24 *
                    31 *
                    [1, 3, 6, 12][Math.floor(Math.random() * 4)],
                trial: false,
                notice: false,
              },
              {
                status: status,
                limit: Math.floor(Math.random() * 10 + 1),
                load: false,
                cancel: [true, false][Math.floor(Math.random() * 2)],
                price: `price_${uid}`,
                start: createAt,
                end:
                  createAt +
                  60 *
                    60 *
                    1000 *
                    24 *
                    31 *
                    [1, 3, 6, 12][Math.floor(Math.random() * 4)],
                option: {
                  freelanceDirect: [true, false][Math.floor(Math.random() * 2)],
                },
                trial: false,
                notice: false,
              },
            ][Math.floor(Math.random() * 2)]
          : {
              status: status,
              limit: Math.floor(Math.random() * 10 + 1),
              trial: [true, false][Math.floor(Math.random() * 2)],
              notice: [true, false][Math.floor(Math.random() * 2)],
            },
      createAt: createAt,
      lastLogin: createAt,
    };
  },

  person: (uid) => {
    const createAt = functions.timestamp();

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
          null,
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
        resident: ["常駐可", "リモート希望", "どちらでも", null][
          Math.floor(Math.random() * 4)
        ],
        working: [Math.floor(Math.random() * 5 + 1), null][
          Math.floor(Math.random() * 2)
        ],
        clothes: ["カジュアル", "スーツ可", "スーツNG", null][
          Math.floor(Math.random() * 4)
        ],
        period: [
          {
            year: null,
            month: null,
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
  },
};

exports.algolia = {
  matter: (uid) => ({
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
      null,
    ][Math.floor(Math.random() * 2)],
    status: ["新規", "提案中", "面談中", "フォロー中", "保留中", "成約"][
      Math.floor(Math.random() * 6)
    ],
    uid: uid,
    createAt: functions.timestamp(),
  }),

  resource: (uid) => ({
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
      year: 2022,
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
      null,
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
    createAt: functions.timestamp(),
  }),

  company: (uid, data) => {
    if (data.payment?.option?.freelanceDirect) {
      return {
        objectID: uid,
        uid: uid,
        status: data.status,
        freelanceDirect: "enable",
        plan: "enable",
        type: data.type,
        name: data.profile.name,
        person: data.profile.person,
        body: data.profile.body,
        position: data.profile.position,
        postal: data.profile.postal,
        address: data.profile.address,
        tel: data.profile.tel,
        email: data.profile.email,
        more: data.profile.more,
        region: data.profile.region,
        social: data.profile.social,
        url: data.profile.url,
        createAt: data.createAt,
        lastLogin: data.createAt,
      };
    } else if (data.payment?.status !== "canceled") {
      return {
        objectID: uid,
        uid: uid,
        status: data.status,
        plan: "enable",
        type: data.type,
        name: data.profile.name,
        person: data.profile.person,
        body: data.profile.body,
        position: data.profile.position,
        postal: data.profile.postal,
        address: data.profile.address,
        tel: data.profile.tel,
        email: data.profile.email,
        more: data.profile.more,
        region: data.profile.region,
        social: data.profile.social,
        url: data.profile.url,
        createAt: data.createAt,
        lastLogin: data.createAt,
      };
    } else {
      return [
        {
          objectID: uid,
          uid: uid,
          status: data.status,
          type: data.type,
          name: data.profile.name,
          person: data.profile.person,
          body: data.profile.body,
          position: data.profile.position,
          postal: data.profile.postal,
          address: data.profile.address,
          tel: data.profile.tel,
          email: data.profile.email,
          more: data.profile.more,
          region: data.profile.region,
          social: data.profile.social,
          url: data.profile.url,
          createAt: data.createAt,
          lastLogin: data.createAt,
        },
        {
          objectID: uid,
          uid: uid,
          status: data.status,
          plan: "disable",
          type: data.type,
          name: data.profile.name,
          person: data.profile.person,
          body: data.profile.body,
          position: data.profile.position,
          postal: data.profile.postal,
          address: data.profile.address,
          tel: data.profile.tel,
          email: data.profile.email,
          more: data.profile.more,
          region: data.profile.region,
          social: data.profile.social,
          url: data.profile.url,
          createAt: data.createAt,
          lastLogin: data.createAt,
        },
        {
          objectID: uid,
          uid: uid,
          status: data.status,
          plan: "disable",
          freelanceDirect: "disable",
          type: data.type,
          name: data.profile.name,
          person: data.profile.person,
          body: data.profile.body,
          position: data.profile.position,
          postal: data.profile.postal,
          address: data.profile.address,
          tel: data.profile.tel,
          email: data.profile.email,
          more: data.profile.more,
          region: data.profile.region,
          social: data.profile.social,
          url: data.profile.url,
          createAt: data.createAt,
          lastLogin: data.createAt,
        },
      ][Math.floor(Math.random() * 3)];
    }
  },

  person: (uid, data) => ({
    objectID: uid,
    uid: uid,
    status: data.status,
    state: data.profile.state,
    name: data.profile.name,
    nickName: data.profile.nickName,
    email: data.profile.email,

    age: data.profile.age,
    sex: data.profile.sex,
    position: data.profile.position,
    location: data.profile.location,
    handles: data.profile.handles,

    body: data.profile.body,
    tools: data.profile.tools,
    skills: data.profile.skills,
    urls: data.profile.urls,
    costs: data.profile.costs,
    working: data.profile.working,
    clothes: data.profile.clothes,
    resident: data.profile.resident,
    period: data.profile.period,

    createAt: data.createAt,
    lastLogin: data.createAt,
  }),
};
