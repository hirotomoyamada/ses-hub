exports.persons = ({ data, user }) => {
  if (!user) {
    const dataTime = Date.now();

    return {
      uid: data.user.uid,
      icon: data.user.icon,
      cover: data.user.cover,
      status: data.user.status,
      profile: {
        name: data.user.name,
        body: data.user.body,
        age: data.user.age,
        sex: data.user.sex,
        position: data.user.position,
        location: data.user.location,
        handles: data.user.handles,
        tools: data.user.tools,
        skills: data.user.skills,
        urls: data.user.urls,
        resume: data.user.resume,
        costs: data.user.costs,
        working: data.user.working,
        resident: data.user.resident,
        clothes: data.user.clothes,
        period: data.user.period,
      },
      updateAt: dataTime,
    };
  } else {
    return {
      objectID: user.uid,
      status: user.status,
      name: user.profile.name,
      body: user.profile.body,
      age: user.profile.age,
      sex: user.profile.sex,
      position: user.profile.position,
      location: user.profile.location,
      handles: user.profile.handles,
      tools: user.profile.tools,
      skills: user.profile.skills,
      urls: user.profile.urls,
      resume: user.profile.resume,
      costs: user.profile.costs,
      working: user.profile.working,
      resident: user.profile.resident,
      clothes: user.profile.clothes,
      period: user.profile.period,
      updateAt: user.updateAt,
    };
  }
};
