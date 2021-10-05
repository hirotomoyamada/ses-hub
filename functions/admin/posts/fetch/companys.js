exports.companys = ({ post, doc, index, hit }) => {
  if (!post) {
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
  } else if (doc) {
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

      follows: doc.data().follows,
      posts: doc.data().posts,
      outputs: doc.data().outputs,
      likes: doc.data().likes,
      entries: doc.data().entries,

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
    post.icon = doc.data().icon;
    post.cover = doc.data().cover;
    post.status = doc.data().status;
    post.provider = doc.data().provider;
    post.agree = doc.data().agree;
    post.posts = doc.data().posts;
    post.likes = doc.data().likes;
    post.outputs = doc.data().outputs;
    post.entries = doc.data().entries;
    post.follows = doc.data().follows;
    post.payment = doc.data().payment;
    post.createAt = doc.data().createAt;
    post.updateAt = doc.data().updateAt;
    post.lastLogin = doc.data().lastLogin;

    return;
  }
};
