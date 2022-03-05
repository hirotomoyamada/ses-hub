import styles from "../Item.module.scss";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { Post } from "./post/Post";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "matters" | "resources";
  post: Matter | Resource;
  user: User;
  outputs?: Matter[] | Resource[];
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
}

export const Outputs: React.FC<PropType> = ({
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
        outputs?.[0]
          ? outputs.map((output) =>
              output.objectID !== post.objectID
                ? handleSelect && handleSelect(post)
                : handleCancel && handleCancel(post.objectID)
            )
          : handleSelect && handleSelect(post)
      }
    >
      {outputs?.map(
        (output) =>
          output.objectID === post.objectID && (
            <CheckCircleIcon
              key={output.objectID}
              className={styles.item_outputs_icon}
            />
          )
      )}

      <Post index={index} post={post} user={user} outputs={outputs} />
    </button>
  );
};
