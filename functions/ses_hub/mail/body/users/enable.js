exports.user = (user, url) => {
  return `
${user.name} ${user.person} 様

承認の完了メールをお送りします。

ログインはこちらから
${url}
`;
};
