import React from "react";
import styles from "./Person.module.scss";

import { Command } from "components/command/Command";

import { Head } from "./components/Head";
import { Handles } from "./components/Handles";
import { Tools } from "./components/Tools";
import { Body } from "./components/Body";
import { Work } from "./components/Work";
import { Name } from "./components/Name";
import { Skills } from "./components/Skills";
import { Costs } from "./components/Costs";
import { Period } from "./components/Period";
import { Private } from "./components/Private";
import { Email } from "./components/Email";
import { Urls } from "./components/Urls";
import { CreateAt } from "./components/CreateAt";
import { Resume } from "./components/Resume";

import * as Post from "types/post";
import { User } from "types/user";

interface PropType {
  user: Post.Person;
  currentUser: User;
}

export const Person: React.FC<PropType> = ({ user, currentUser }) => {
  return (
    <div className={styles.profile}>
      <Head user={user} />

      <div
        className={`${styles.profile_container} ${
          user?.profile?.body && styles.profile_container_dev
        } `}
      >
        <Handles user={user} />
        <Tools user={user} />
      </div>

      {user?.profile?.body && (
        <div className={styles.profile_container}>
          <Body user={user} />
        </div>
      )}

      <div className={styles.profile_container}>
        <Work user={user} />
        <Name user={user} />
        <Skills user={user} />
        <Costs user={user} />
        <Period user={user} />
      </div>

      <Resume user={user} />

      <div className={styles.profile_container}>
        <Private user={user} />
        <Email user={user} />
        <Urls user={user} />
        <CreateAt user={user} />
      </div>

      <Command index="persons" post={user} user={currentUser} />
    </div>
  );
};
