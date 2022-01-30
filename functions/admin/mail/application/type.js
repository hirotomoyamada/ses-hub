exports.user = (user, url) => {
  return `
${user.name} ${user.person} 様

法人アカウントの申請を承認いたしました。

法人プランはこちらから
${url}
`;
};
