import styles from "../Header.module.scss";

export const Title = ({ post }) => {
  const newPost = post?.createAt > Date.now() - 6000 * 600 * 24 * 3;

  return post?.title ? (
    <h1 className={styles.header_ttl}>
      {post.title}&nbsp;
      {newPost && <span className={styles.header_ttl_new}>NEW</span>}
    </h1>
  ) : post?.roman ? (
    <h1 className={styles.header_ttl}>
      {post?.roman?.firstName?.substring(0, 1)}&nbsp;.&nbsp;
      {post?.roman?.lastName?.substring(0, 1)}&nbsp;
      {newPost && <span className={styles.header_ttl_new}>NEW</span>}
    </h1>
  ) : (
    <></>
  );
};
