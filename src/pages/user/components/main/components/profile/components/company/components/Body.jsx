import styles from "../Company.module.scss";

export const Body = ({ user }) => {
  return user?.profile?.body ? (
    <p className={styles.profile_body}>{user?.profile?.body}</p>
  ) : (
    <p className={styles.profile_body}>
      さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!
    </p>
  );
};
