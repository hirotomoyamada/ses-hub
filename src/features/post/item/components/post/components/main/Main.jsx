import styles from "./Main.module.scss";

import { Location, Station } from "./components/Location";
import { Costs } from "./components/Costs";
import { Remote, Belong } from "./components/Remote";
import { Times, Period } from "./components/Times";
import { Body } from "./components/Body";
import { Adjustment } from "./components/Adjustment";

export const Main = ({ post, resources }) => {
  return !resources ? (
    <div className={styles.main}>
      <div className={styles.main_side}>
        <Location post={post} />

        <Remote post={post} />

        <Times post={post} />

        <Costs post={post} />

        <Adjustment post={post} />
      </div>

      <Body post={post} />
    </div>
  ) : (
    <div className={styles.main}>
      <div className={styles.main_side}>
        <Station post={post} />

        <Belong post={post} />

        <Period post={post} />

        <Costs post={post} />
      </div>

      <Body post={post} />
    </div>
  );
};
