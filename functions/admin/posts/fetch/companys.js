exports.companys = ({ posts, doc, index, i, hit, lists }) => {
  if (hit) {
    return {
      uid: hit.objectID,
      name: hit.name,
      person: hit.person,
      position: hit.position,
      body: hit.body,
      email: hit.email,
      tel: hit.tel,
      postal: hit.postal,
      address: hit.address,
      url: hit.url,
      social: hit.social,
      more: hit.more,
      region: hit.region,
    };
  } else if (doc && index) {
    return {
      index: index,
      uid: doc.id,
      icon: doc.data().icon,
      cover: doc.data().cover,
      status: doc.data().status,
      payment: doc.data().payment,
      agree: doc.data().agree,
      provider: doc.data().provider,
      createAt: doc.data().createAt,
      updateAt: doc.data().updateAt,
      lastLogin: doc.data().lastLogin,

      follows: lists.follows,
      posts: lists.posts,
      outputs: lists.outputs,
      likes: lists.likes,
      entries: lists.entries,
      home: lists.home,

      name: doc.data().profile.name,
      person: doc.data().profile.person,
      position: doc.data().profile.position,
      body: doc.data().profile.body,
      more: doc.data().profile.more,
      region: doc.data().profile.region,
      postal: doc.data().profile.postal,
      address: doc.data().profile.address,
      tel: doc.data().profile.tel,
      email: doc.data().profile.email,
      social: doc.data().profile.social,
    };
  } else {
    posts[i].icon = doc.data().icon;
    posts[i].cover = doc.data().cover;
    posts[i].status = doc.data().status;
    posts[i].provider = doc.data().provider;
    posts[i].agree = doc.data().agree;
    posts[i].posts = doc.data().posts;
    posts[i].likes = doc.data().likes;
    posts[i].outputs = doc.data().outputs;
    posts[i].entries = doc.data().entries;
    posts[i].follows = doc.data().follows;
    posts[i].home = doc.data().home;
    posts[i].payment = doc.data().payment;
    posts[i].createAt = doc.data().createAt;
    posts[i].updateAt = doc.data().updateAt;
    posts[i].lastLogin = doc.data().lastLogin;

    return;
  }
};
