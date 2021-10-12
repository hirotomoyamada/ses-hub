import styles from "./Main.module.scss";

import { Title } from "./components/Title";
import { Body } from "./components/Body";
import { Belong } from "./components/Belong";
import { AreaLocation, PlaceLocation } from "./components/Location";
import { Station } from "./components/Station";
import { Period } from "./components/Period";
import { Times } from "./components/Times";
import { Position } from "./components/Position";
import { Handles } from "./components/Handles";
import { Tools } from "./components/Tools";
import { Requires } from "./components/Requires";
import { Perfers } from "./components/Perfers";
import { Skills } from "./components/Skills";
import { Interviews } from "./components/Interviews";
import { Adjustment } from "./components/Adjustment";
import { Costs } from "./components/Costs";
import { Distribution } from "./components/Distribution";
import { Span } from "./components/Span";
import { Parallel } from "./components/Parallel";
import { Note } from "./components/Note";
import { Status } from "./components/Status";
import { Remote } from "./components/Remote";
import { Age } from "./components/Age";
import { Sex } from "./components/Sex";
import { Roman } from "./components/Roman";
import { Memo } from "./components/Memo";

export const Main = ({ index }) => {
  switch (index) {
    case "matters":
      return (
        <div className={styles.main}>
          <Status />
          <Title />
          <Position />
          <Body index={index} />

          <div className={styles.main_grid}>
            <AreaLocation />
            <PlaceLocation />
            <Remote />
          </div>

          <div className={`${styles.main_grid} ${styles.main_grid_mid}`}>
            <Period index={index} />
            <Times />
          </div>

          <div className={styles.main_col}>
            <span className={styles.main_tag}>開発環境</span>
            <div>
              <Handles index={index} />
              <Tools index={index} />
            </div>
          </div>

          <div className={styles.main_col}>
            <span className={styles.main_tag}>必須</span>
            <Requires />
          </div>

          <div className={styles.main_col}>
            <span className={styles.main_tag}>尚可</span>
            <Perfers />
          </div>

          <Interviews />

          <Costs />

          <div className={styles.main_grid}>
            <Adjustment />
            <Distribution />
            <Span />
          </div>

          <Note />
          <Memo index={index} />
        </div>
      );
    case "resources":
      return (
        <div className={styles.main}>
          <Status />
          <Roman />
          <Position />

          <div className={`${styles.main_grid} ${styles.main_grid_mid}`}>
            <div className={`${styles.main_grid} ${styles.main_grid_half}`}>
              <Sex />
              <Age />
            </div>
          </div>

          <Body index={index} />

          <div className={styles.main_grid}>
            <Belong />
            <Station />
          </div>

          <div className={styles.main_grid}>
            <Period index={index} />
          </div>
          <Costs />

          <div className={styles.main_col}>
            <span className={styles.main_tag}>開発環境</span>
            <Handles index={index} />
            <Tools index={index} />
          </div>

          <div className={styles.main_col}>
            <span className={styles.main_tag}>スキル</span>
            <Skills />
          </div>

          <Parallel />
          <Note />

          <Memo index={index} />
        </div>
      );
    default:
      return <div>エラーが発生しました</div>;
  }
};
