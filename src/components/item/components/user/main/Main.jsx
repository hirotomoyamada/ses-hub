import styles from "./Main.module.scss";

import { Costs } from "./components/Costs";
import { Period } from "./components/Period";
import { Location } from "./components/Location";
import { Private } from "./components/Private";
import { Body } from "./components/Body";

export const Main = ({ index, post }) => {
  return index !== "persons" ? (
    <div className={styles.main_companys}>
      <p className={styles.main_companys_body}>
        {post?.profile?.body
          ? post?.profile?.body
          : "さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!"}
      </p>
    </div>
  ) : (
    <div className={styles.main}>
      <div className={styles.main_side}>
        <Location post={post} />
        <Private post={post} />
        <Period post={post} />
        <Costs post={post} />
      </div>

      <Body post={post} />
    </div>
  );
};
