import React from 'react';
import styles from './Load.module.scss';

import { Oval } from 'react-loader-spinner';

interface PropType {
  load: React.RefObject<HTMLDivElement>;
  page: number;
  hit: {
    posts: number;
    pages: number;
    currentPage: number;
  };
  disable?: boolean;
  boxSize?: number;
}

export const Load: React.FC<PropType> = ({ load, page, hit, disable, boxSize = 32 }) => {
  return (
    <div
      ref={load}
      className={`${styles.load} ${(page === hit?.pages || disable) && styles.load_none}`}>
      {page < hit?.pages && <Oval color='#49b757' height={boxSize} width={boxSize} />}
    </div>
  );
};
