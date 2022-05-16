import React from "react";
import styles from "../../Main.module.scss";

import { Operation } from "components/operation/Operation";

import { Header } from "../header/Header";
import { Txt } from "../Txt";
import { Feilds } from "../Feilds";
import { Period } from "../Period";
import { Costs } from "../Costs";
import { Memo } from "../Memo";

import { Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "resources";
  post: Resource;
  user: User;
}

export const Resources: React.FC<PropType> = ({ index, post, user }) => {
  return (
    <div className={styles.main_inner}>
      <Operation index={index} post={post} back />

      <Header post={post} user={user} />

      {(post?.handles?.[0] || post?.tools?.[0]) && (
        <div className={styles.main_col}>
          <span className={styles.main_tag}>開発環境</span>
          <Feilds array={post?.handles} acnt />
          <Feilds array={post?.tools} />
        </div>
      )}

      <Txt tag="PR文" txt={post?.body} txtarea />

      <Feilds tag="スキル" array={post?.skills} />

      <Txt tag="所属" txt={post?.belong} />

      <Txt tag="性別" txt={post?.sex} />

      <Txt tag="年齢" txt={post?.age} end="歳" />

      <Period period={post?.period} resources />

      <Txt tag="最寄駅" txt={post?.station} />

      <Costs costs={post?.costs} />

      <Txt tag="並行" txt={post?.parallel} none={post?.note ? false : true} />

      <Txt tag="備考" txt={post?.note} txtarea none />

      <Memo memo={post?.memo} index={index} />
    </div>
  );
};
