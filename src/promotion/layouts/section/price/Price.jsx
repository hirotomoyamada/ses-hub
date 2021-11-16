import root from "../Section.module.scss";
import styles from "./Price.module.scss";

import { useState } from "react";

// import { Index } from "./components/index/Index"; // ver 2.0.0
import { Table } from "./components/table/Table";

export const Price = () => {
  const tax = 1.1;
  const individual = {
    month: { n: 1, p: Math.round(3500 * tax) },
    monthsThree: { n: 3, p: Math.round(3000 * tax) },
    monthsSix: { n: 6, p: Math.round(2800 * tax) },
    year: { n: 12, p: Math.round(2500 * tax) },
  };

  const corporate = {
    five: { n: "5", p: Math.round(45000 * tax) },
    ten: { n: "10", p: Math.round(90000 * tax) },
    fifteen: { n: "15", p: Math.round(135000 * tax) },
    twenty: { n: "20", p: Math.round(180000 * tax) },
  };

  const totalPrice = (i, n) => {
    return (i * n).toLocaleString();
  };

  const [
    index,
    // setIndex // ver 2.0.0
  ] = useState("individual");

  return (
    <section className={`${styles.price} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.price_ttl} ${root.section_ttl}`}>料金</h1>

        {/* ver 2.0.0 */}
        {/* <Index index={index} setIndex={setIndex} /> */}

        <p className={`${styles.price_desc} ${root.section_desc}`}>
          {index === "individual"
            ? "期間に応じて、お得な料金システム"
            : "利用人数に応じて、お得な料金システム"}
        </p>

        <Table
          index={index}
          price={index === "individual" ? individual : corporate}
          totalPrice={totalPrice}
        />

        {index === "corporate" && (
          <>
            <span className={styles.price_announce}>
              ※ 法人契約は、すべて3ヶ月単位の利用料金になっております。
            </span>
            <br />
          </>
        )}
        <span className={styles.price_announce}>
          ※ 決済方法やプランは変更になる場合がございます。
        </span>
      </div>
    </section>
  );
};
