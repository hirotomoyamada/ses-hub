exports.companys = ({ context, doc, data, hit, demo }) => {
  if (doc) {
    return {
      uid: context.auth.uid,
      icon: doc.data().icon,
      cover: doc.data().cover,
      provider: data
        ? data.providerData.map((provider) => provider.providerId)
        : doc.data().provider,
      profile: doc.data().profile,
      type: doc.data().type,
      agree: doc.data().agree,
      payment: {
        status: doc.data().payment.status,
        option: doc.data().payment.option,
        price: doc.data().payment.price,
        end: doc.data().payment.end,
        notice: doc.data().payment.notice,
        cancel: doc.data().payment.cancel,
        trial: doc.data().payment.trial,
        load: doc.data().payment.load,
      },
      posts: doc.data().posts,
      entries: doc.data().entries,
      likes: doc.data().likes,
      follows: doc.data().follows,
      home: doc.data().home,
      outputs: doc.data().outputs,
      createAt: doc.data().createAt,
      updateAt: doc.data().updateAt,
    };
  } else {
    return {
      uid: hit.objectID,
      profile: {
        name: hit.name,
        person: hit.person,
        body: hit.body,
        postal: hit.postal,
        address: hit.address,
        tel: !demo ? hit.tel : null,
        email: !demo ? hit.email : null,
        more: hit.more,
        region: hit.region,
        url: !demo ? hit.url : null,
        social: !demo ? hit.social : {},
      },
      createAt: hit.createAt,
    };
  }
};
