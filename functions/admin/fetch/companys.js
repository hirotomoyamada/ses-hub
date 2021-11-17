exports.companys = ({ doc, index, lists, parent, posts, hit }) => {
  // fetchPosts, extractPosts
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
  }
  // fetchUser
  else if (!posts) {
    return {
      index: index,
      uid: doc.id,
      icon: doc.data().icon,
      cover: doc.data().cover,
      status: doc.data().status,
      payment: doc.data().payment,
      type: doc.data().type,
      agree: doc.data().agree,
      provider: doc.data().provider,
      createAt: doc.data().createAt,
      updateAt: doc.data().updateAt,
      lastLogin: doc.data().lastLogin,

      follows: lists ? lists.follows : doc.data().follows,
      posts: lists ? lists.posts : doc.data().posts,
      outputs: lists ? lists.outputs : doc.data().outputs,
      likes: lists ? lists.likes : doc.data().likes,
      entries: lists ? lists.entries : doc.data().entries,
      home: lists ? lists.home : doc.data().home,

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

      parent: parent ? parent : null,
    };
  }
  // fetchPosts, extractPosts 追加取得
  else {
    posts[index].icon = doc.data().icon;
    posts[index].cover = doc.data().cover;
    posts[index].status = doc.data().status;
    posts[index].provider = doc.data().provider;
    posts[index].type = doc.data().type;
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
