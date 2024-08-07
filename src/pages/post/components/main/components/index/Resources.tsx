import React from 'react';
import styles from '../../Main.module.scss';

import { Operation } from 'components/operation/Operation';
import { Command } from 'components/command/Command';

import { Header } from '../header/Header';
import { Txt } from '../Txt';
import { Feilds } from '../Feilds';
import { Period } from '../Period';
import { Costs } from '../Costs';
import { Memo } from '../Memo';

import { Resource } from 'types/post';
import { User } from 'types/user';

interface PropType {
  index: 'resources';
  post: Resource;
  user: User;
}

export const Resources: React.FC<PropType> = ({ index, post, user }) => {
  const isMask = post.uid !== user.uid && user.payment.status === 'canceled';

  return (
    <div className={styles.main_inner}>
      {post?.uid === user.uid && (
        <Operation index={index} post={post} back className={styles.main_operation} />
      )}

      <Header post={post} user={user} />

      <Command index={index} user={user} post={post} />

      {(post?.handles?.[0] || post?.tools?.[0]) && (
        <div className={styles.main_col}>
          <span className={styles.main_tag}>開発環境</span>
          <Feilds array={post?.handles} acnt />
          <Feilds array={post?.tools} />
        </div>
      )}

      <Txt tag='PR文' txt={post?.body} txtarea />

      <Feilds tag='スキル' array={post?.skills} />

      <Txt tag='所属' txt={post?.belong} />

      <Txt tag='性別' txt={post?.sex} />

      <Txt tag='年齢' txt={post?.age} end='歳' />

      <Period period={post?.period} resources />

      <Txt tag='最寄駅' txt={post?.station} mask={isMask} />

      <Costs costs={post?.costs} />

      <Txt tag='並行' txt={post?.parallel} none={post?.note ? false : true} mask={isMask} />

      <Txt tag='備考' txt={post?.note} txtarea none mask={isMask} />

      <Memo memo={post?.memo} index={index} />
    </div>
  );
};
