import styles from '../Main.module.scss';

import { Matter, Resource } from 'types/post';

interface PropType {
  post: Matter | Resource;
  viewed?: boolean;
}

export const Body: React.FC<PropType> = ({ viewed, post }) => {
  const unviewed = viewed && typeof post.viewed === 'boolean' && !post.viewed;

  return (
    <div className={`${styles.main_body} ${unviewed && styles.main_body_unviewed}`}>
      <p className={styles.main_body_txt}>{post?.body}</p>
    </div>
  );
};
