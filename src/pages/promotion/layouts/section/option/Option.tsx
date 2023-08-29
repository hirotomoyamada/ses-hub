import React from 'react';
import root from '../Section.module.scss';
import { Analytics } from './Analytics';
import { FreelanceDirect } from './FreelanceDirect';
import styles from './Option.module.scss';
import { AI } from './AI';

export const Option: React.FC = () => {
  return (
    <article className={`${styles.option} ${root.article}`}>
      <AI />
      <Analytics />
      <FreelanceDirect />

      <div>
        <span className={styles.option_announce}>
          ※ 有料オプションのみではSES_HUBをご利用いただけません。
        </span>
        <br />
        <span className={styles.option_announce}>※ 有料プランと合わせてご利用ください。</span>
      </div>
    </article>
  );
};
