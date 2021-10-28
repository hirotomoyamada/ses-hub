exports.companys = ({ data, user }) => {
  if (!user) {
    const timestamp = Date.now();

    return {
      uid: data.user.uid,
      icon: data.user.icon,
      cover: data.user.cover,
      status: data.user.status,
      profile: {
        name: data.user.name,
        person: data.user.person,
        body: data.user.body,
        more: data.user.more ? data.user.more : [],
        region: data.user.region ? data.user.region : [],
        postal: data.user.postal,
        address: data.user.address,
        tel: data.user.tel,
        url: data.user.url,
        social: data.user.social,
      },
      updateAt: timestamp,
    };
  } else {
    return {
      objectID: user.uid,
      status: user.status,
      name: user.profile.name,
      person: user.profile.person,
      body: user.profile.body,
      more: user.profile.more,
      region: user.profile.region,
      postal: user.profile.postal,
      address: user.profile.address,
      tel: user.profile.tel,
      url: user.profile.url,
      social: user.profile.social,
      updateAt: user.updateAt,
    };
  }
};
