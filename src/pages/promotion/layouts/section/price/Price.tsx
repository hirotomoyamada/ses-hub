import React, { useState } from 'react';
import root from '../Section.module.scss';
import styles from './Price.module.scss';

import { Index } from './components/index/Index';
import { Table } from './components/table/Table';

export interface PriceType {
  [key: string]: { n: number; p: number };
}

export const Price: React.FC = () => {
  const tax = 1.1;
  const individual: PriceType = {
    month: { n: 1, p: 7000 },
    monthsThree: { n: 3, p: 6000 },
    monthsSix: { n: 6, p: 5000 },
  };

  const corporate: PriceType = {
    five: { n: 5, p: 75000 },
    ten: { n: 10, p: 150000 },
    fifteen: { n: 15, p: 225000 },
    twenty: { n: 20, p: 300000 },
  };

  const totalPrice = (p: number, n: number): string => {
    return (Math.round(p * tax) * n).toLocaleString();
  };

  const [index, setIndex] = useState<'individual' | 'corporate'>('individual');

  return (
    <section className={`${styles.price} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <span className={styles.price_campaign}>
          \&nbsp;最先端技術のAIツールが使えてこの価格&nbsp;/
        </span>
        <h1 className={`${styles.price_ttl} ${root.section_ttl}`}>料金</h1>

        <Index index={index} setIndex={setIndex} />

        <p className={`${styles.price_desc} ${root.section_desc}`}>
          {index === 'individual'
            ? '期間に応じて、お得な料金システム'
            : 'チームの人数に応じて、お得な料金システム'}
        </p>

        <Table
          index={index}
          price={index === 'individual' ? individual : corporate}
          tax={tax}
          totalPrice={totalPrice}
        />

        {index === 'corporate' && (
          <>
            <span className={styles.price_announce}>
              ※ グループアカウントは、すべて3ヶ月単位の利用料金になっております。
            </span>
            <br />
          </>
        )}
        <span className={styles.price_announce}>
          ※ 決済方法やプラン(価格)は変更になる場合がございます。
        </span>
        <br />
        <span className={styles.price_announce}>
          ※ 人材マッチング機能による他社案件/要員の詳細閲覧や問い合わせサービスは
          別途有料プランの加入が必要です。詳細はお問い合わせ下さい。
        </span>
      </div>
    </section>
  );
};
