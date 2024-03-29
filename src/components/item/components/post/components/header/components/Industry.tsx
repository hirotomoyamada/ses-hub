import styles from '../Header.module.scss';

import { Matter } from 'types/post';

interface PropType {
  post: Matter;
}

export const Industry: React.FC<PropType> = ({ post }) => {
  return post?.industry ? (
    <div className={styles.header_industry}>
      <h2 className={styles.header_industry_txt}>{post?.industry}</h2>
    </div>
  ) : null;
};
