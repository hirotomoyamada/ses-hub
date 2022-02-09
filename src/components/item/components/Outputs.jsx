import styles from "../Item.module.scss";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { Post } from "./post/Post";

export const Outputs = ({
  index,
  post,
  user,
  outputs,
  handleSelect,
  handleCancel,
}) => {
  return (
    <button
      className={styles.item_btn}
      type="button"
      onClick={() =>
        outputs[0]
          ? outputs.map((output) =>
              output.objectID !== post.objectID
                ? handleSelect({ post })
                : handleCancel(post.objectID)
            )
          : handleSelect({ post })
      }
    >
      {outputs.map(
        (output) =>
          output.objectID === post.objectID && (
            <CheckCircleIcon
              key={output.objectID}
              className={styles.item_outputs_icon}
            />
          )
      )}

      <article
        className={`${styles.item} ${styles.item_none} ${outputs
          .map(
            (output) => output.objectID === post.objectID && styles.item_outputs
          )
          .join(" ")}`}
      >
        <div className={styles.item_inner}>
          <Post index={index} post={post} user={user} />
        </div>
      </article>
    </button>
  );
};
