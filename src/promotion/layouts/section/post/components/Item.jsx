import styles from "./Item.module.scss";
import { Matters } from "./Matters";
import { Resources } from "./Resources";

export const Item = ({ index, post }) => {
  return (
    <div className={styles.item}>
      {index === "matters" ? (
        <Matters post={post} />
      ) : (
        index === "resources" && <Resources post={post} />
      )}
    </div>
  );
};
