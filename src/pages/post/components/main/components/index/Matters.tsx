import React from "react";
import styles from "../../Main.module.scss";

import { Operation } from "components/operation/Operation";

import { Header } from "../header/Header";
import { Txt } from "../Txt";
import { Feilds } from "../Feilds";
import { Period } from "../Period";
import { Costs } from "../Costs";
import { Times } from "../Times";
import { Interviews } from "../Interviews";
import { Memo } from "../Memo";

import { Matter } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "matters";
  post: Matter;
  user: User;
}

export const Matters: React.FC<PropType> = ({ index, post, user }) => {
  return (
    <div className={styles.main_inner}>
      <Operation index={index} post={post} user={user} back />

      <Header post={post} user={user} />

      {(post?.handles?.[0] || post?.tools?.[0]) && (
        <div className={styles.main_col}>
          <span className={styles.main_tag}>開発環境</span>
          <Feilds array={post?.handles} acnt />
          <Feilds array={post?.tools} />
        </div>
      )}

      <Txt tag="案件詳細" txt={post?.body} txtarea />

      <Feilds tag="必須" array={post?.requires} />

      <Feilds tag="尚可" array={post?.prefers} />

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

      <Txt tag="稟議速度" txt={post?.approval ? post?.approval : "不明"} />

      <Interviews
        interviews={post?.interviews}
        none={post?.note ? false : true}
      />

      <Txt tag="備考" txt={post?.note} none txtarea />

      <Memo memo={post?.memo} index={index} />
    </div>
  );
};
