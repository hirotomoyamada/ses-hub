exports.companys = ({ context, data, create, doc }) => {
  const timestamp = create ? context.auth.token.auth_time * 1000 : Date.now();

  const profile = create
    ? {
        name: data.name,
        person: data.person,
        position: data.position,
        body: "",
        postal: data.postal,
        address: data.address,
        email: context.auth.token.email,
        tel: data.tel,
        more: [],
        region: [],
        url: "",
        social: { twitter: "", instagram: "", line: "", linkedIn: "" },
      }
    : {
        name: data.name,
        person: data.person,
        body: data.body,
        more: data.more ? data.more : [],
        region: data.region ? data.region : [],
        postal: data.postal,
        address: data.address,
        tel: data.tel,
        url: data.url,
        social: data.social,
      };

  if (doc) {
    if (create) {
      const icon = Math.floor(Math.random() * 17 + 1);
      const cover = Math.floor(Math.random() * 18 + 1);

      return {
        status: "hold",
        type: data.type,
        agree: data.agree,
        payment: {
          status: "canceled",
          trial: data.type !== "corporate" ? true : false,
          notice: true,
        },
        provider: [data.provider],

        icon: `icon${icon}`,
        cover: `cover${cover}`,

        profile: profile,

        posts: { matters: [], resources: [] },
        entries: { matters: [], resources: [], persons: [] },
        likes: { matters: [], resources: [], persons: [] },
        outputs: { matters: [], resources: [] },
        follows: [],
        home: [],

        createAt: timestamp,
        lastLogin: timestamp,
      };
    } else {
      return {
        icon: data.icon,
        cover: data.cover,

        profile: profile,

        updateAt: timestamp,
      };
    }
  } else {
    if (create) {
      return {
        objectID: context.auth.uid,
        uid: context.auth.uid,
        status: "hold",

        name: profile.name,
        person: profile.person,
        body: profile.body,
        position: profile.position,
        postal: profile.postal,
        address: profile.address,
        tel: profile.tel,
        email: profile.email,
        more: profile.more,
        region: profile.region,
        social: profile.social,
        url: profile.url,

        createAt: timestamp,
        lastLogin: timestamp,
      };
    } else {
      return {
        objectID: context.auth.uid,

        name: profile.name,
        person: profile.person,
        body: profile.body,
        more: profile.more,
        region: profile.region,
        postal: profile.postal,
        address: profile.address,
        tel: profile.tel,
        url: profile.url,
        social: profile.social,

        updateAt: timestamp,
      };
    }
  }
};
