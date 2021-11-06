<<<<<<< HEAD
=======
const dummy = require("../../../dummy").dummy;

>>>>>>> dev
exports.companys = ({ hit, demo }) => {
  return {
    uid: hit.objectID,
    profile: {
<<<<<<< HEAD
      name: hit.name,
      person: hit.person,
=======
      name: !demo ? hit.name : dummy("name"),
      person: !demo ? hit.person : dummy("person"),
>>>>>>> dev
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
