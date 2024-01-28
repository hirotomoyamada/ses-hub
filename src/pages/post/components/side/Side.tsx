import React from 'react';
import styles from './Side.module.scss';
import { Oval } from 'react-loader-spinner';

import { Link } from 'react-router-dom';

import { Item } from 'components/item/Item';
import { List } from 'components/list/List';

import { Matter, Resource } from 'types/post';
import { User } from 'types/user';

interface PropType {
  index: 'matters' | 'resources';
  post: Matter | Resource;
  posts: Matter[] | Resource[];
  user: User;
}

export const Side: React.FC<PropType> = ({ index, post, posts, user }) => {
  let resolvedIndex = index;

  if (user?.uid === post?.user?.uid)
    resolvedIndex = resolvedIndex === 'matters' ? 'resources' : 'matters';

  return (
    <div className={styles.side}>
      <span className={styles.side_tag}>投稿したユーザー</span>

      {post?.user?.uid ? (
        <Item index={'companys'} user={user} post={post.user} />
      ) : (
        <div className={styles.side_load}>
          <Oval color='#49b757' height={56} width={56} />
        </div>
      )}

      {user?.uid !== post?.user?.uid && (
        <Link to={`/companys/${post?.user?.uid}`} className={styles.side_desc}>
          このユーザーの他の投稿を見る
        </Link>
      )}

      {user?.type !== 'child' && (
        <>
          {posts.length ? (
            <span className={styles.side_tag}>
              {resolvedIndex === 'matters'
                ? 'こんな案件もオススメ'
                : resolvedIndex === 'resources' && 'こんな人材もオススメ'}
            </span>
          ) : null}

          <List
            index={resolvedIndex}
            user={user}
            posts={posts}
            disable={true}
            viewed={user?.uid === post?.user?.uid}
          />
        </>
      )}
    </div>
  );
};
