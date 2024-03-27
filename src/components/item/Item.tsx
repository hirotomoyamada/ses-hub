import React from 'react';
import styles from './Item.module.scss';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Post } from './components/post/Post';
import { User } from './components/user/User';

import { Operation } from 'components/operation/Operation';
// import { Follow } from 'components/follow/Follow';

import { Matter, Resource, Company, Person } from 'types/post';
import { User as UserType } from 'types/user';
import { Command } from 'components/command/Command';

interface PropType {
  post: Matter | Resource | Company | Person | Matter['user'] | Resource['user'];
  user: UserType;
  index?: 'matters' | 'resources' | 'companys' | 'persons';
  status?: boolean;
  display?: boolean;
  viewed?: boolean;
  outputs?: Matter[] | Resource[];
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
  select?: string[];
  selectUser?: (uid: string) => void;
}

export const Item: React.FC<PropType> = ({
  index,
  post,
  user,
  status,
  display,
  outputs,
  handleSelect,
  handleCancel,
  select,
  // selectUser,
  viewed,
}) => {
  const unviewed =
    viewed &&
    typeof (post as Matter | Resource).viewed === 'boolean' &&
    !(post as Matter | Resource).viewed;

  const handleOpen = () => {
    if (outputs?.[0]) {
      outputs.map((output) => {
        if (output.objectID !== (post as Matter | Resource).objectID) {
          handleSelect && handleSelect(post as Matter | Resource);
        } else {
          handleCancel && handleCancel((post as Matter | Resource).objectID);
        }
      });
    } else {
      switch (index) {
        case 'matters':
        case 'resources':
          {
            const url = `/${index}/${(post as Matter | Resource).objectID}`;

            window.open(url);
          }
          break;
        case 'companys':
        case 'persons':
          {
            const url = `/${index}/${(post as Company | Person).uid}`;
            window.open(url);
          }
          break;
      }
    }
  };

  return (
    <div
      className={`
        ${styles.item}
        ${unviewed && styles.item_unviewed}
        ${select && styles.item_select}
        ${outputs
          ?.map(
            (output) =>
              output.objectID === (post as Matter | Resource).objectID && styles.item_outputs,
          )
          .join(' ')}
      `}>
      {
        index !== 'companys' && !select
          ? post?.uid === user.uid &&
            !outputs?.length && (
              <Operation
                index={index as 'matters' | 'resources'}
                post={post as Matter | Resource}
                item
              />
            )
          : null
        // post?.uid !== user.uid && (
        //     <Follow user={user} post={post as Company} select={select} selectUser={selectUser} />
        //   )
      }

      <button type='button' className={styles.item_btn} onClick={handleOpen}>
        {index === 'matters' || index === 'resources' ? (
          <>
            {outputs?.map(
              (output) =>
                output.objectID === (post as Matter | Resource).objectID && (
                  <CheckCircleIcon key={output.objectID} className={styles.item_icon} />
                ),
            )}

            <Post
              index={index}
              post={post as Matter | Resource}
              user={user}
              status={status}
              display={display}
              viewed={viewed}
            />
          </>
        ) : (
          <User index={index} post={post as Company | Person} user={user} />
        )}
      </button>

      {index !== 'companys' && !outputs?.[0] && !select && (
        <Command index={index} post={post as Matter | Resource | Person} user={user} item />
      )}
    </div>
  );
};
