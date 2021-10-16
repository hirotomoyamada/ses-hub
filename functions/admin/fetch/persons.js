exports.persons = ({ doc, index, lists, posts, hit }) => {
  if (hit) {
    return {
      uid: hit.objectID,
      name: hit.name,
      email: hit.email,
      body: hit.body,
      age: hit.age,
      sex: hit.sex,
      position: hit.position,
      location: hit.location,
      handles: hit.handles,
      tools: hit.tools,
      skills: hit.skills,
      urls: hit.urls,
      resume: hit.resume,
      costs: hit.costs,
      resident: hit.resident,
      clothes: hit.clothes,
      period: hit.period,
    };
  } else if (!posts) {
    return {
      index: index,
      uid: doc.id,
      icon: doc.data().icon,
      cover: doc.data().cover,
      status: doc.data().status,
      agree: doc.data().agree,
      provider: doc.data().provider,
      createAt: doc.data().createAt,
      updateAt: doc.data().updateAt,
      lastLogin: doc.data().lastLogin,

      follows: lists.follows,
      home: lists.home,
      likes: lists.likes,
      entries: lists.entries,
      history: lists.history,
      requests: lists.requests,

      name: doc.data().profile.name,
      email: doc.data().profile.email,
      body: doc.data().profile.body,
      age: doc.data().profile.age,
      sex: doc.data().profile.sex,
      position: doc.data().profile.position,
      location: doc.data().profile.location,
      handles: doc.data().profile.handles,
      tools: doc.data().profile.tools,
      skills: doc.data().profile.skills,
      urls: doc.data().profile.urls,
      resume: doc.data().profile.resume,
      costs: doc.data().profile.costs,
      working: doc.data().profile.working,
      resident: doc.data().profile.resident,
      clothes: doc.data().profile.clothes,
      period: doc.data().profile.period,
    };
  } else {
    posts[index].icon = doc.data().icon;
    posts[index].cover = doc.data().cover;
    posts[index].status = doc.data().status;
    posts[index].provider = doc.data().provider;
    posts[index].agree = doc.data().agree;
    posts[index].likes = doc.data().likes;
    posts[index].entries = doc.data().entries;
    posts[index].follows = doc.data().follows;
    posts[index].requests = doc.data().requests;
    posts[index].home = doc.data().home;
    posts[index].history = doc.data().history;
    posts[index].createAt = doc.data().createAt;
    posts[index].updateAt = doc.data().updateAt;
    posts[index].lastLogin = doc.data().lastLogin;

    return;
  }
};
