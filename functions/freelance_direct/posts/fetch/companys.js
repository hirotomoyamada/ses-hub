const functions = require("firebase-functions");
<<<<<<< HEAD
=======
const dummy = require("../../../dummy").dummy;
>>>>>>> dev

exports.companys = ({ hit, doc, demo, none }) => {
  if (!doc) {
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
      },
    };
  } else if (none) {
    return {
      uid: null,
      icon: "freelanceDirect",
<<<<<<< HEAD
=======
      type: "individual",
>>>>>>> dev
      profile: {
        name: "Hit me up株式会社",
        person: "freelance Direct 事務局",
        body: null,
<<<<<<< HEAD
        email: !demo ? functions.config().admin.freelance_direct : null,
=======
        email: !demo ? functions.config().admin.contact : null,
>>>>>>> dev
        social: null,
      },
    };
  } else {
    return {
      uid: doc.id,
      icon: doc.data().icon,
<<<<<<< HEAD
      profile: {
        name: doc.data().profile.name,
        person: doc.data().profile.person,
=======
      type: doc.data().type,
      profile: {
        name: !demo ? hit.name : dummy("name"),
        person: !demo ? hit.person : dummy("person"),
>>>>>>> dev
        body: doc.data().profile.body,
        email: !demo ? doc.data().profile.email : null,
        social: !demo ? doc.data().profile.social : {},
      },
    };
  }
};
