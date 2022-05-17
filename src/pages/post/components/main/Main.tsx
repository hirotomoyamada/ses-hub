import styles from "./Main.module.scss";
import { Oval } from "react-loader-spinner";

import { Matters } from "./components/index/Matters";
import { Resources } from "./components/index/Resources";
import { Entry } from "./components/entry/Entry";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "matters" | "resources";
  post: Matter | Resource;
  user: User;
  entry: boolean;
  handleEntry: () => void;
}

export const Main: React.FC<PropType> = ({
  index,
  post,
  user,
  entry,
  handleEntry,
}) => {
  return (
    <div className={styles.main}>
      {post?.objectID ? (
        <>
          {index === "matters" ? (
            <Matters index={index} post={post as Matter} user={user} />
          ) : (
            index === "resources" && (
              <Resources index={index} post={post as Resource} user={user} />
            )
          )}

          <Entry
            post={post}
            user={user}
            entry={entry}
            handleEntry={handleEntry}
          />
        </>
      ) : (
        <div className={styles.main_load}>
          <Oval color="#49b757" height={56} width={56} />
        </div>
      )}
    </div>
  );
};
