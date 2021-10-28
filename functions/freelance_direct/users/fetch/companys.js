exports.companys = ({ hit, demo }) => {
  return {
    uid: hit.objectID,
    profile: {
      name: hit.name,
      person: hit.person,
      body: hit.body,
      postal: hit.postal,
      address: hit.address,
      email: !demo ? hit.email : null,
      url: !demo ? hit.url : null,
      social: !demo ? hit.social : {},
    },
    createAt: hit.createAt,
    updateAt: hit.updateAt,
  };
};
