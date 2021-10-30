import root from "../Section.module.scss";
import styles from "./Plan.module.scss";

import { Price } from "./components/Price";
import { Function } from "./components/Function";

export const Plan = () => {
  const tax = 1.1;
  const price = {
    month: Math.round(3500 * tax),
    monthsThree: Math.round(3000 * tax),
    monthsSix: Math.round(2800 * tax),
    year: Math.round(2500 * tax),
  };

  const totalPrice = (plan, months) => {
    return (plan * months).toLocaleString();
  };

  return (
    <section className={`${styles.plan} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.plan_ttl} ${root.section_ttl}`}>プラン</h1>
        <Function />
        <Price price={price} totalPrice={totalPrice} />
      </div>
    </section>
  );
};
