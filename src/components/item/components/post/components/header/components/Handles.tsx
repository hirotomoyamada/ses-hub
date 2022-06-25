import styles from "../Header.module.scss";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Handles: React.FC<PropType> = ({ post }) => {
  const handles = post?.handles;
  return handles?.[0] ? (
    <div className={handles && styles.header_tags}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle &&
            index < 5 && (
              <div className={styles.header_tags_tag} key={index}>
                <h3 className={styles.header_tags_tag_txt}>{handle}</h3>
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};
