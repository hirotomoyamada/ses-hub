import React from 'react';
import styles from './Advertise.module.scss';

import { User } from 'types/user';
import { Active } from './components/active/Active';
import { Analytics } from './components/analytics/Analytics';
import { Entry } from './components/entry/Entry';

interface PropType {
  user: User;
  text?: string;
  type?: string;
  handleClose: () => void;
  close?: () => void;
}

export const Advertise: React.FC<PropType> = ({ user, text, type, close, handleClose }) => {
  return (
    <div className={styles.advertise}>
      {(() => {
        switch (type) {
          case 'active':
            return <Active user={user} text={text} handleClose={handleClose} close={close} />;

          case 'entry':
            return <Entry handleClose={handleClose} close={close} />;

          case 'analytics':
            return <Analytics user={user} handleClose={handleClose} close={close} />;

          default:
            return <></>;
        }
      })()}
    </div>
  );
};
