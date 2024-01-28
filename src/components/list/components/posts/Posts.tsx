import styles from './Posts.module.scss';

import { useSelector } from 'react-redux';
import * as userSlice from 'features/user/userSlice';

import { Item } from 'components/item/Item';
import { Advertise } from '../advertise/Advertise';

import { Matter, Resource } from 'types/post';
import { Company, Person } from 'types/post';

interface PropType {
  posts:
    | (Matter | undefined)[]
    | (Resource | undefined)[]
    | (Company | undefined)[]
    | (Person | undefined)[];
  list: React.RefObject<HTMLDivElement>;
  index?: 'matters' | 'resources' | 'companys' | 'persons';
  select?: string[];
  selectUser?: (uid: string) => void;
  open?: boolean;
  side?: boolean;
  viewed?: boolean;
  outputs?: Matter[] | Resource[];
  disable?: boolean;
  handleSelect?: (post: Matter | Resource) => void;
  handleCancel?: (objectID: string) => void;
}

export const Posts: React.FC<PropType> = ({
  index,
  posts,
  list,
  select,
  selectUser,
  open,
  side,
  outputs,
  disable,
  viewed,
  handleSelect,
  handleCancel,
}) => {
  const user = useSelector(userSlice.user);

  return (
    <div
      className={`
      ${styles.posts}
      ${side && styles.posts_side}
      ${open && styles.posts_side_open}
      ${select && styles.posts_select}
      ${disable && !side && styles.posts_disable}
      ${disable && side && styles.posts_disable_side}
      `}
      ref={list}>
      {(() => {
        const array = posts?.map((post) => {
          if (post)
            return (
              <Item
                key={
                  (post as Matter | Resource).objectID
                    ? (post as Matter | Resource).objectID
                    : post.uid
                }
                index={index}
                post={post}
                user={user}
                select={select}
                selectUser={selectUser}
                outputs={outputs}
                handleSelect={handleSelect}
                handleCancel={handleCancel}
                viewed={viewed}
                status={side}
                display={side}
              />
            );
        });

        if (index !== 'companys')
          if (user?.payment?.status === 'canceled') {
            for (let i = 0; i < Math.floor(array?.length / 11) + 1; i++) {
              array.splice(i * 11, 0, <Advertise user={user} key={i * 11} />);
            }
          }

        return array;
      })()}
    </div>
  );
};
