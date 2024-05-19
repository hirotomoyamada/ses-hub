import React from 'react';
import styles from './Post.module.scss';

import { usePost } from 'hooks/usePost';

import { Meta } from './Meta';
import { Main } from './components/main/Main';
import { Side } from './components/side/Side';
import { useParams } from 'react-router-dom';

interface PropType {
  index: 'matters' | 'resources';
}

export const Post: React.FC<PropType> = ({ index }) => {
  const { objectID } = useParams<{ objectID: string }>();
  const [post, bests, user] = usePost(index, objectID);

  return (
    <div className={styles.post}>
      <Meta index={index} post={post} />

      <Main index={index} post={post} user={user} />

      <Side index={index} post={post} posts={bests} user={user} />
    </div>
  );
};
