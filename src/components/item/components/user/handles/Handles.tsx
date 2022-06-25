import styles from "./Handles.module.scss";

import { Person } from "types/post";

interface PropType {
  post: Person;
}

export const Handles: React.FC<PropType> = ({ post }) => {
  const handles = post?.profile?.handles;
  return handles?.[0] ? (
    <div className={handles && styles.handles}>
      {handles?.[0] &&
        handles.map(
          (handle, index) =>
            handle &&
            index < 5 && (
              <div className={styles.handles_tag} key={index}>
                <h3 className={styles.handles_tag_txt}>{handle}</h3>
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};
