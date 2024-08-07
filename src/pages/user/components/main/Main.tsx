import React from 'react';
import styles from './Main.module.scss';

import { Oval } from 'react-loader-spinner';

import { Request } from 'components/request/Request';

import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { Profile } from './components/profile/Profile';
import { Company, Person } from 'types/post';
import { User } from 'types/user';

interface PropType {
  uid: string;
  user: User | Company | Person;
  currentUser: User;
  index: 'companys' | 'persons';
  main: React.RefObject<HTMLDivElement>;
}

export const Main: React.FC<PropType> = ({ uid, user, currentUser, index, main }) => {
  return (
    <div className={styles.main} ref={main}>
      {user.uid ? (
        <>
          <Header user={user} />

          <div className={styles.main_inner}>
            {currentUser.uid === uid ? (
              <Editor user={currentUser} />
            ) : index === 'companys' ? null : (
              // <Follow user={currentUser} post={user as Company} profile />
              index === 'persons' && <Request user={user as Person} />
            )}

            <Profile index={index} user={user} currentUser={currentUser} />
          </div>
        </>
      ) : (
        <div className={styles.main_load}>
          <Oval color='#49b757' height={56} width={56} />
        </div>
      )}
    </div>
  );
};
