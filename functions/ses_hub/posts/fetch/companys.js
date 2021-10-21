exports.companys = ({ hit }) => {
  return {
    uid: hit.objectID,
    profile: {
      name: hit.name,
      person: hit.person,
      body: hit.body,
    },
  };
};
