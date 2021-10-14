exports.companys = ({ doc, index, lists, posts }) => {
  if (!posts) {
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
    posts[index].icon = doc.data().icon;
    posts[index].cover = doc.data().cover;
    posts[index].status = doc.data().status;
    posts[index].provider = doc.data().provider;
    posts[index].agree = doc.data().agree;
    posts[index].posts = doc.data().posts;
    posts[index].likes = doc.data().likes;
    posts[index].outputs = doc.data().outputs;
    posts[index].entries = doc.data().entries;
    posts[index].follows = doc.data().follows;
    posts[index].home = doc.data().home;
    posts[index].payment = doc.data().payment;
    posts[index].createAt = doc.data().createAt;
    posts[index].updateAt = doc.data().updateAt;
    posts[index].lastLogin = doc.data().lastLogin;

    return;
  }
};
