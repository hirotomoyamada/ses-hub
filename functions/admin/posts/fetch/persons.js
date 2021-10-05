exports.persons = ({ posts, doc, index, i, hit }) => {
  if (!posts) {
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

      follows: doc.data().follows,
      likes: doc.data().likes,
      entries: doc.data().entries,
      data: doc.data().data,

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
    posts[i].data = doc.data().data;
    posts[i].createAt = doc.data().createAt;
    posts[i].updateAt = doc.data().updateAt;
    posts[i].lastLogin = doc.data().lastLogin;

    return;
  }
};
