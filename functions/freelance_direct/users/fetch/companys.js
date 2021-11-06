const functions = require("firebase-functions");

const dummy = require("../../../dummy").dummy;

exports.companys = ({ hit, demo }) => {
  return {
    uid: hit.objectID,
    profile: {
      name: !demo
        ? hit.name
        : hit.objectID !== functions.config().demo.ses_hub.uid
        ? dummy("name")
        : "Hit me up株式会社",
      person: !demo
        ? hit.person
        : hit.objectID !== functions.config().demo.ses_hub.uid
        ? dummy("person")
        : "羽生太郎",
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
