exports.persons = ({ context, data, file, create, doc }) => {
  const timestamp = create ? context.auth.token.auth_time * 1000 : Date.now();

  const profile = create
    ? {
        state: "案件探し中",
        nickName: "",
        name: data.name,
        email: context.auth.token.email,
        age: data.age,
        sex: data.sex,
        position: data.position,
        location: data.location,
        handles: data.handles,

        body: "",
        tools: [],
        skills: [],
        urls: [],
        costs: {
          min: "",
          max: "",
          display: "private",
          type: "応談",
        },
        working: "",
        resident: "",
        clothes: "",
        period: { year: "", month: "" },
      }
    : {
        nickName: data.nickName,
        body: data.body,
        age: data.age,
        sex: data.sex,
        position: data.position,
        location: data.location,
        period: data.period,

        handles: data.handles,
        tools: data.tools,
        skills: data.skills,
        urls: data.urls,

        resident: data.resident,
        working: data.working,
        clothes: data.clothes,
        costs: data.costs,
      };

  if (doc) {
    if (create) {
      const icon = Math.floor(Math.random() * (36 - 18) + 18);
      const cover = Math.floor(Math.random() * 19);

      return {
        status: "hold",
        agree: data.agree,
        resume: {
          key: file.key,
          url: file.url,
        },
        provider: [data.provider],

        icon: `icon${icon}`,
        cover: `cover${cover}`,

        profile: profile,

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

        state: profile.state,
        nickName: profile.nickName,
        name: profile.name,
        email: profile.email,
        age: profile.age,
        sex: profile.sex,
        position: profile.position,
        location: profile.location,
        handles: profile.handles,
        body: profile.body,
        tools: profile.tools,
        skills: profile.skills,
        urls: profile.urls,
        costs: profile.costs,
        working: profile.working,
        clothes: profile.clothes,
        resident: profile.resident,
        period: profile.period,

        createAt: timestamp,
        lastLogin: timestamp,
      };
    } else {
      return {
        objectID: context.auth.uid,

        nickName: profile.nickName,
        body: profile.body,
        age: profile.age,
        sex: profile.sex,
        position: profile.position,
        location: profile.location,
        period: profile.period,
        handles: profile.handles,
        tools: profile.tools,
        skills: profile.skills,
        urls: profile.urls,
        resident: profile.resident,
        working: profile.working,
        clothes: profile.clothes,
        costs: profile.costs,

        updateAt: timestamp,
      };
    }
  }
};
