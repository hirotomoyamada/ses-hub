import styles from './Main.module.scss';

import { Location, Station } from './components/Location';
import { Costs } from './components/Costs';
import { Remote, Belong } from './components/Remote';
import { Times, Period } from './components/Times';
import { Body } from './components/Body';
import { Adjustment } from './components/Adjustment';

import { Matter, Resource } from 'types/post';
import { User } from 'types/user';

interface PropType {
  post: Matter | Resource;
  resources?: boolean;
  viewed?: boolean;
  user: User;
}

export const Main: React.FC<PropType> = ({ post, viewed, resources, user }) => {
  return !resources ? (
    <div className={styles.main}>
      <div className={styles.main_side}>
        <Location post={post} />
        <Remote post={post as Matter} />
        <Times post={post} />
        <Costs post={post} />
        <Adjustment post={post as Matter} />
      </div>

      <Body post={post} viewed={viewed} />
    </div>
  ) : (
    <div className={styles.main}>
      <div className={styles.main_side}>
        {post.uid === user.uid || user.payment.status !== 'canceled' ? (
          <Station post={post} />
        ) : null}
        <Belong post={post as Resource} />
        <Period post={post} />
        <Costs post={post} />
      </div>

      <Body post={post} viewed={viewed} />
    </div>
  );
};
