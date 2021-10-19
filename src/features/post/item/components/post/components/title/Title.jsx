import styles from "./Title.module.scss";

export const Title = ({ post, resources }) => {
  const newPost = post?.createAt > Date.now() - 60 * 60 * 24 * 3 * 1000;

  return !resources ? (
    <div className={styles.title}>
      <h1 className={styles.title_txt}>{post?.title}</h1>
      {newPost && <span className={styles.title_new}>NEW</span>}
    </div>
  ) : (
    <div className={styles.title}>
      <h1 className={styles.title_txt}>
        {post?.roman?.firstName?.substring(0, 1)}&nbsp;.&nbsp;
        {post?.roman?.lastName?.substring(0, 1)}&nbsp;
      </h1>
      {newPost && <span className={styles.title_new}>NEW</span>}
    </div>
  );
};
