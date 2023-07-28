import React from 'react';
import styles from './Company.module.scss';

import { Head } from './components/Head';
import { Body } from './components/Body';
import { More } from './components/More';
import { Address } from './components/Address';
import { Url } from './components/Url';
import { CreateAt } from './components/CreateAt';
import { Payment } from './components/Payment';

import * as Post from 'types/post';
import { User } from 'types/user';
import { Follow } from './components/Follow';

interface PropType {
  user: Post.Company;
  demo: boolean;
}

export const Company: React.FC<PropType> = ({ user, demo }) => {
  return (
    <div className={styles.profile}>
      <Head user={user} />

      <Payment user={user as Post.Company | User} />

      <Body user={user} />

      <div className={styles.profile_container}>
        <More user={user} />

        <Address user={user} demo={demo} />

        <Url user={user} demo={demo} />

        <CreateAt user={user} />

        <Follow user={user as Post.Company | User} />
      </div>
    </div>
  );
};
