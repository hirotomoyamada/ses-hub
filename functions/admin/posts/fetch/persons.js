exports.persons = ({ posts, doc, index, hit }) => {
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
