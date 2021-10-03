import styles from "../Header.module.scss";

export const Handles = ({ post }) => {
  const handles = post?.handles;
  return (
    <div className={handles && styles.header_tags}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle && (
              <div className={styles.header_tags_tag} key={index}>
                <h3 className={styles.header_tags_tag_txt}>{handle}</h3>
              </div>
            )
        )}
    </div>
  );
};
