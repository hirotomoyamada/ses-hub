import styles from "./Item.module.scss";

export const Handles = ({ post }) => {
  const handles = post?.handles;
  return (
    <div className={handles && styles.item_tags}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle && (
              <div className={styles.item_tags_tag} key={index}>
                <h3>{handle}</h3>
              </div>
            )
        )}
    </div>
  );
};
