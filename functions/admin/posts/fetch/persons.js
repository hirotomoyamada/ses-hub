exports.persons = ({ posts, doc, index, i, hit, lists }) => {
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
      data: hit.data,
      costs: hit.costs,
      resident: hit.resident,
      clothes: hit.clothes,
      span: hit.span,
    };
  } else if (doc && index) {
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
      data: doc.data().profile.data,
      costs: doc.data().profile.costs,
      working: doc.data().profile.working,
      resident: doc.data().profile.resident,
      clothes: doc.data().profile.clothes,
      span: doc.data().profile.span,
    };
  } else {
    posts[i].icon = doc.data().icon;
    posts[i].cover = doc.data().cover;
    posts[i].status = doc.data().status;
    posts[i].provider = doc.data().provider;
    posts[i].agree = doc.data().agree;
    posts[i].likes = doc.data().likes;
    posts[i].entries = doc.data().entries;
    posts[i].follows = doc.data().follows;
    posts[i].requests = doc.data().requests;
    posts[i].home = doc.data().home;
    posts[i].history = doc.data().history;
    posts[i].createAt = doc.data().createAt;
    posts[i].updateAt = doc.data().updateAt;
    posts[i].lastLogin = doc.data().lastLogin;

    return;
  }
};
