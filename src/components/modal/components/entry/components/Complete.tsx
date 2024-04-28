import React, { FC } from 'react';
import styles from '../Entry.module.scss';
import { Matter, Resource } from 'types/post';

interface PropType {
  index: 'matters' | 'resources';
  post: Matter | Resource;
  proposedPost: Matter | Resource | undefined;
}

export const Complete: React.FC<PropType> = ({ index, post, proposedPost }) => {
  index = index === 'matters' ? 'resources' : 'matters';

  if (!proposedPost) return null;

  return (
    <div className={styles.entry_complete}>
      <div>
        <p className={styles.entry_complete_ttl}>提案した{index === 'matters' ? '案件' : '人材'}</p>

        <div className={styles.entry_complete_content}>
          <Content post={proposedPost} />
        </div>
      </div>

      <div>
        <p className={styles.entry_complete_ttl}>
          問い合わせした{index === 'matters' ? '人材' : '案件'}
        </p>

        <div className={styles.entry_complete_content}>
          <Content post={post} />
        </div>
      </div>
    </div>
  );
};

type ContentProps = {
  post: Matter | Resource;
};

const Content: FC<ContentProps> = ({ post }) => {
  if ('title' in post) {
    return (
      <>
        <p className={styles.entry_complete_content_ttl}>{post.title}</p>

        <p>{post.position}</p>
        <p>業界：{post.industry}</p>
        <p>
          開始：{post.period.year}年 {post.period.month}月
        </p>
        <p>
          場所：{post.location.area} {post.location.place}
        </p>
        <p>遠隔：{post.remote}</p>
        <p>
          時間：{post.times.start} 〜 {post.times.end}
        </p>
        <p>精算：{post.adjustment}</p>
        <p>
          単価：
          {post.costs.display !== 'public'
            ? post.costs.type
            : post.costs.min
            ? `{post.costs.min}万 〜 ${post.costs.max}万`
            : `〜 ${post.costs.max}万`}
        </p>
        <p>
          面談：{post.interviews.type} {post.interviews.count}
        </p>
      </>
    );
  } else {
    return (
      <>
        <p className={styles.entry_complete_content_ttl}>
          {post.roman.firstName.substring(0, 1)} . {post.roman.lastName.substring(0, 1)}
        </p>
        <p>{post.position}</p>
        <p>所属：{post.belong}</p>
        <p>性別：{post.sex}</p>
        <p>年齢：{post.age}歳</p>
        <p>
          開始：{post.period.year}年 {post.period.month}月
        </p>
        <p>最寄：{post.station}</p>
        <p>
          単価：
          {post.costs.display !== 'public'
            ? post.costs.type
            : post.costs.min
            ? `{post.costs.min}万 〜 ${post.costs.max}万`
            : `〜 ${post.costs.max}万`}
        </p>
      </>
    );
  }
};
