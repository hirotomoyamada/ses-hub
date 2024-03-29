import React, { forwardRef } from 'react';
import styles from './Main.module.scss';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as userSlice from 'features/user/userSlice';

import { Title } from './components/Title';
import { Body } from './components/Body';
import { Belong } from './components/Belong';
import { AreaLocation, PlaceLocation } from './components/Location';
import { Station } from './components/Station';
import { Period } from './components/Period';
import { Times } from './components/Times';
import { Position } from './components/Position';
import { Handles } from './components/Handles';
import { Tools } from './components/Tools';
import { Requires } from './components/Requires';
import { Perfers } from './components/Perfers';
import { Skills } from './components/Skills';
import { Interviews } from './components/Interviews';
import { Adjustment } from './components/Adjustment';
import { Costs } from './components/Costs';
import { Distribution } from './components/Distribution';
import { Span } from './components/Span';
import { Parallel } from './components/Parallel';
import { Note } from './components/Note';
import { Status } from './components/Status';
import { Remote } from './components/Remote';
import { Age } from './components/Age';
import { Sex } from './components/Sex';
import { Roman } from './components/Roman';
import { Memo } from './components/Memo';
import { Approval } from './components/Approval';
import { Industry } from './components/Industry';

interface PropType {
  index: 'matters' | 'resources';
  edit?: boolean;
  handleClose: () => void;
}

export const Main = forwardRef<HTMLDivElement, PropType>(({ index, edit, handleClose }, ref) => {
  const user = useSelector(userSlice.user);

  switch (index) {
    case 'matters':
      return (
        <div ref={ref} className={styles.main}>
          {user.payment?.status === 'canceled' && !edit ? (
            <Link to={'/plan'} className={styles.main_banner} onClick={handleClose}>
              <span>AIで{index === 'matters' ? '案件' : '人材'}を自動登録できるって、ホント？</span>

              <img
                src={`${process.env.PUBLIC_URL}/img/app/ai.svg`}
                alt=''
                className={styles.main_banner_bg}
              />
            </Link>
          ) : null}

          <Status />
          <Title />

          <div className={`${styles.main_grid} ${styles.main_grid_mid}`}>
            <Industry />
            <Position />
          </div>

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

          <div className={`${styles.main_col} ${styles.main_col_none}`}>
            <span className={styles.main_tag}>開発環境</span>
            <div>
              <Handles index={index} />
              <Tools index={index} />
              <span className={styles.main_desc}>
                &nbsp;※&nbsp;言語・フレームワーク・ツールが該当しない場合は、下記&nbsp;備考&nbsp;欄にご記載ください
              </span>
            </div>
          </div>

          <div className={`${styles.main_col} ${styles.main_col_none}`}>
            <span className={styles.main_tag}>必須</span>
            <Requires />
          </div>

          <div className={`${styles.main_col} ${styles.main_col_none}`}>
            <span className={styles.main_tag}>歓迎</span>
            <Perfers />
          </div>

          <Interviews />

          <Costs index={index} />

          <div className={styles.main_grid}>
            <Adjustment />
            <Distribution />
            <Span />
            <Approval />
          </div>

          <Note />
          <Memo index={index} />
        </div>
      );
    case 'resources':
      return (
        <div ref={ref} className={styles.main}>
          {user.payment?.status === 'canceled' && !edit ? (
            <Link to={'/plan'} className={styles.main_banner} onClick={handleClose}>
              バナー(仮)
            </Link>
          ) : null}

          <Status />
          <Roman />

          <div className={`${styles.main_grid} ${styles.main_grid_mid}`}>
            <Position />
          </div>

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

          <Costs index={index} />

          <div className={`${styles.main_col} ${styles.main_col_none}`}>
            <span className={styles.main_tag}>開発環境</span>
            <div>
              <Handles index={index} />
              <Tools index={index} />
              <span className={styles.main_desc}>
                &nbsp;※&nbsp;言語・フレームワーク・ツールが該当しない場合は、下記&nbsp;備考&nbsp;欄にご記載ください
              </span>
            </div>
          </div>

          <div className={`${styles.main_col} ${styles.main_col_none}`}>
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
});
