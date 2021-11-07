import styles from "./Form.module.scss";

import { Header } from "./components/header/Header";
import { Name } from "./components/Name";
import { Person } from "./components/Person";
import { Address } from "./components/Address";
import { Tel } from "./components/Tel";
import { Body } from "./components/Body";
import { Url } from "./components/Url";
import { Social } from "./components/Social";
import { More } from "./components/More";

export const Form = ({ cover, icon, setCover, setIcon, setLine }) => {
  return (
    <div className={styles.form}>
      <Header cover={cover} icon={icon} setCover={setCover} setIcon={setIcon} />

      <div className={styles.form_inner}>
        <Name />
        <Person />
        <Body />
        <More />
        <Address />
        <Tel />
        <Url />
        <Social setLine={setLine} />
      </div>
    </div>
  );
};
