import styles from "./Can.module.scss";
import root from "../Section.module.scss";

import { Contact } from "./components/Contact";
import { Search } from "./components/Search";
import { Matching } from "./components/Matching";

export const Can = () => {
  return (
    <section className={`${styles.can} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.can_ttl} ${root.section_ttl}`}>できること</h1>
        <Contact />
        <Search />
        <Matching />
      </div>
    </section>
  );
};
