exports.companys = ({ context, data, customer, create, child, doc }) => {
  const timestamp = create ? context.auth.token.auth_time * 1000 : Date.now();

  const profile = create
    ? {
        name: !child ? data.name : data.profile.name,
        person: !child ? data.person : "",
        position: !child ? data.position : "",
        body: "",
        postal: !child ? data.postal : data.profile.postal,
        address: !child ? data.address : data.profile.address,
        email: context.auth.token.email,
        tel: !child ? data.tel : "",
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
        status: !child ? "hold" : "enable",
        type: !child ? data.type : "child",
        agree: !child ? data.agree : "enable",
        payment: !child
          ? {
              id: customer.stripeId,
              link: customer.stripeLink,
              status: "canceled",
              trial: data.type !== "parent" ? true : false,
              notice: true,
              // ver 2.X.X
              // 削除予定
              option: { freelanceDirect: true },
            }
          : data.payment.option
          ? {
              option: data.payment.option,

              status: data.payment.status,
              cancel: data.payment.cancel,
              trial: data.payment.trial,
              load: data.payment.load,
              parent: data.uid,
              start: data.payment.start,
              end: data.payment.end,
              price: data.payment.price,
              notice: data.payment.notice,
            }
          : {
              status: data.payment.status,
              cancel: data.payment.cancel,
              trial: data.payment.trial,
              load: data.payment.load,
              parent: data.uid,
              start: data.payment.start,
              end: data.payment.end,
              price: data.payment.price,
              notice: data.payment.notice,
            },
        provider: !child ? [data.provider] : ["password"],

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
      return !child
        ? {
            objectID: context.auth.uid,
            uid: context.auth.uid,
            status: "hold",
            type: data.type,

            // ver 2.X.X
            // 削除予定
            freelanceDirect: "enable",

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
          }
        : {
            objectID: context.auth.uid,
            uid: context.auth.uid,
            status: "enable",
            type: "child",

            plan: data.payment?.status !== "canceled" ? "enable" : "disable",
            freelanceDirect: data.payment?.option?.freelanceDirect
              ? "enable"
              : "disable",

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
        objectID: context.auth.uid === data.uid ? context.auth.uid : data.uid,

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
