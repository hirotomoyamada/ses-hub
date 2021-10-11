import styles from "../../Main.module.scss";

import { Menu } from "../../../../menu/Menu";

import { Header } from "../header/Header";
import { Txt } from "../Txt";
import { Feilds } from "../Feilds";
import { Period } from "../Period";
import { Costs } from "../Costs";
import { Times } from "../Times";
import { Interviews } from "../Interviews";
import { Memo } from "../Memo";

export const Matters = ({ index, post, user }) => {
  return (
    <div className={styles.main_inner}>
      <Menu index={index} post={post} user={user} back />

      <Header post={post} user={user} />

      {(post?.handles?.[0] || post?.tools?.[0]) && (
        <div className={styles.main_col}>
          <span className={styles.main_tag}>開発環境</span>
          <Feilds objects={post?.handles} acnt />
          <Feilds objects={post?.tools} />
        </div>
      )}

      <Txt tag="案件詳細" txt={post?.body} txtarea />

      <Feilds tag="必須" objects={post?.requires} />

      <Feilds tag="尚可" objects={post?.prefers} />

      <Period period={post?.period} matters />

      <Txt
        tag="場所"
        txt={{ area: post?.location?.area, place: post?.location?.place }}
        location
      />

      <Txt tag="リモート" txt={post?.remote} />

      <Times times={post?.times} />

      <Txt tag="精算" txt={post?.adjustment} />

      <Costs costs={post?.costs} />

      <Txt tag="商流" txt={post?.distribution} />

      <Txt tag="支払いサイト" txt={post?.span} end="日" />

      <Interviews
        interviews={post?.interviews}
        none={post?.note ? false : true}
      />

      <Txt tag="備考" txt={post?.note} none txtarea />

      <Memo memo={post?.memo} index={index} />
    </div>
  );
};
