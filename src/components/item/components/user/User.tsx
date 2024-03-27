import React from 'react';
import styles from './User.module.scss';

import { Handles } from './handles/Handles';
import { Header } from './header/Header';
import { Main } from './main/Main';

import { Company, Person } from 'types/post';
import { User as UserType } from 'types/user';

interface PropType {
  post: Company | Person;
  index?: 'companys' | 'persons';
  user: UserType;
}

export const User: React.FC<PropType> = ({ index, post, user }) => {
  return (
    <article>
      <div className={styles.user}>
        <Header index={index} post={post} user={user} />
        <Handles post={post as Person} />
        <Main index={index} post={post} user={user} />
      </div>
    </article>
  );
};
