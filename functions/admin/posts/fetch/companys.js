exports.companys = ({ posts, doc, index, hit }) => {
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
