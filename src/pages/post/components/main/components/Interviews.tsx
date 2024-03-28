import React from 'react';
import styles from '../Main.module.scss';

import { Matter } from 'types/post';

interface PropType {
  interviews: Matter['interviews'];
  mask?: boolean;
}

export const Interviews: React.FC<PropType> = ({ interviews, mask }) => {
  return (
    <>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>面談</span>
        <p className={`${mask && styles.main_dummy}`}>
          {interviews?.type}&nbsp;{interviews?.count}
        </p>
      </div>

      <div className={`${styles.main_col}`}>
        <span className={styles.main_tag}>面談設定</span>
        <p className={`${mask && styles.main_dummy}`}>{interviews?.setting ?? '-'}</p>
      </div>
    </>
  );
};
