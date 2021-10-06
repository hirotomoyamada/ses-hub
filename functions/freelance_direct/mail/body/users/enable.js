exports.user = (user, url) => {
  return `
${user.name} 様

承認の完了メールをお送りします。

ログインはこちらから
${url}
`;
};
