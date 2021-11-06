import { Handles } from "./handles/Handles";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import styles from "./User.module.scss";

export const User = ({ index, post }) => {
  return (
    <div className={styles.user}>
      <Header post={post} />
      <Handles post={post} />
      <Main index={index} post={post} />
    </div>
  );
};
