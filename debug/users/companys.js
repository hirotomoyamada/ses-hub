const value = require("./value");
const data = require("../create");

module.exports = ({ uid, objectIDs, user }) => {
  if (!user) {
    const status = ["active", "trialing", "canceled"][
      Math.floor(Math.random() * 3)
    ];

    const createAt =
      data.createAt + 60 * 60 * 1000 * Math.floor(Math.random() * 528 + 1);

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
          "",
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
        url: ["", `https://${uid}.com`][Math.floor(Math.random() * 2)],
        social: {
          twitter: ["", `https://twitter.com/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          instagram: ["", `https://instagram.com/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          line: ["", `https://line.me/ti/p/${uid}`][
            Math.floor(Math.random() * 2)
          ],
          linkedIn: ["", `https://linkedin.com/in/${uid}`][
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
              trial: [true, false][Math.floor(Math.random() * 2)],
              notice: [true, false][Math.floor(Math.random() * 2)],
            },
      createAt: createAt,
      lastLogin: createAt,
    };
  } else {
    if (user.payment?.option?.freelanceDirect) {
      return {
        objectID: uid,
        uid: uid,
        status: user.status,
        freelanceDirect: "enable",
        plan: "enable",
        type: user.type,
        name: user.profile.name,
        person: user.profile.person,
        body: user.profile.body,
        position: user.profile.position,
        postal: user.profile.postal,
        address: user.profile.address,
        tel: user.profile.tel,
        email: user.profile.email,
        more: user.profile.more,
        region: user.profile.region,
        social: user.profile.social,
        url: user.profile.url,
        createAt: user.createAt,
        lastLogin: user.createAt,
      };
    } else if (user.payment?.status !== "canceled") {
      return {
        objectID: uid,
        uid: uid,
        status: user.status,
        plan: "enable",
        type: user.type,
        name: user.profile.name,
        person: user.profile.person,
        body: user.profile.body,
        position: user.profile.position,
        postal: user.profile.postal,
        address: user.profile.address,
        tel: user.profile.tel,
        email: user.profile.email,
        more: user.profile.more,
        region: user.profile.region,
        social: user.profile.social,
        url: user.profile.url,
        createAt: user.createAt,
        lastLogin: user.createAt,
      };
    } else {
      return [
        {
          objectID: uid,
          uid: uid,
          status: user.status,
          type: user.type,
          name: user.profile.name,
          person: user.profile.person,
          body: user.profile.body,
          position: user.profile.position,
          postal: user.profile.postal,
          address: user.profile.address,
          tel: user.profile.tel,
          email: user.profile.email,
          more: user.profile.more,
          region: user.profile.region,
          social: user.profile.social,
          url: user.profile.url,
          createAt: user.createAt,
          lastLogin: user.createAt,
        },
        {
          objectID: uid,
          uid: uid,
          status: user.status,
          plan: "disable",
          type: user.type,
          name: user.profile.name,
          person: user.profile.person,
          body: user.profile.body,
          position: user.profile.position,
          postal: user.profile.postal,
          address: user.profile.address,
          tel: user.profile.tel,
          email: user.profile.email,
          more: user.profile.more,
          region: user.profile.region,
          social: user.profile.social,
          url: user.profile.url,
          createAt: user.createAt,
          lastLogin: user.createAt,
        },
        {
          objectID: uid,
          uid: uid,
          status: user.status,
          plan: "disable",
          freelanceDirect: "disable",
          type: user.type,
          name: user.profile.name,
          person: user.profile.person,
          body: user.profile.body,
          position: user.profile.position,
          postal: user.profile.postal,
          address: user.profile.address,
          tel: user.profile.tel,
          email: user.profile.email,
          more: user.profile.more,
          region: user.profile.region,
          social: user.profile.social,
          url: user.profile.url,
          createAt: user.createAt,
          lastLogin: user.createAt,
        },
      ][Math.floor(Math.random() * 3)];
    }
  }
};
