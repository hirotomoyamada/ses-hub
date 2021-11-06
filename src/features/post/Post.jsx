import styles from "./Post.module.scss";

import { Meta } from "./Meta";
import { Main } from "./layouts/main/Main";
import { Side } from "./layouts/side/Side";
import { useEntry } from "./hook/useEntry";
import { usePost } from "./hook/usePost";

export const Post = ({ index, objectID }) => {
  const [post, bests, user] = usePost(index, objectID);
  const [entry, handleEntry] = useEntry(index, post, user);

  return (
    <div className={styles.post}>
      <Meta post={post} />

      <Main
        index={index}
        post={post}
        user={user}
        entry={entry}
        handleEntry={handleEntry}
      />

      <Side index={index} post={post} posts={bests} user={user} />
    </div>
  );
};
