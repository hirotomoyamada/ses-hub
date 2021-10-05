exports.persons = ({ post, doc, index, hit }) => {
  if (!post) {
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
  } else if (doc) {
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
    post.icon = doc.data().icon;
    post.cover = doc.data().cover;
    post.status = doc.data().status;
    post.provider = doc.data().provider;
    post.agree = doc.data().agree;
    post.likes = doc.data().likes;
    post.entries = doc.data().entries;
    post.follows = doc.data().follows;
    post.data = doc.data().data;
    post.createAt = doc.data().createAt;
    post.updateAt = doc.data().updateAt;
    post.lastLogin = doc.data().lastLogin;

    return;
  }
};
