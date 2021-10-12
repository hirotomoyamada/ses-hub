import styles from "./Terms.module.scss";

import { useEffect } from "react";

import { Header } from "../../components/header/Header";

import { Body } from "./components/Body";
import { Section } from "./components/Section";
import { BackNumber } from "./components/BackNumber";

import { definition } from "./data/definition";
import { application } from "./data/application";
import { examination } from "./data/examination";
import { account } from "./data/account";
import { data } from "./data/data";
import { plan } from "./data/plan";
import { start } from "./data/start";
import { price } from "./data/price";
import { period } from "./data/period";
import { secret } from "./data/secret";
import { ban } from "./data/ban";
import { suspension } from "./data/suspension";
import { limited } from "./data/limited";
import { withdrawal } from "./data/withdrawal";
import { attribution } from "./data/attribution";
import { privacy } from "./data/privacy";
import { reparation } from "./data/reparation";
import { disclaimer } from "./data/disclaimer";
import { service } from "./data/service";
import { corporation } from "./data/corporation";
import { notification } from "./data/notification";
import { transfer } from "./data/transfer";
import { rules } from "./data/rules";
import { separation } from "./data/separation";
import { law } from "./data/law";

export const Terms = ({ setTerms }) => {
  const sections = [
    definition,
    application,
    examination,
    account,
    data,
    plan,
    start,
    price,
    period,
    secret,
    ban,
    suspension,
    limited,
    withdrawal,
    attribution,
    privacy,
    reparation,
    disclaimer,
    service,
    corporation,
    notification,
    transfer,
    rules,
    separation,
    law,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.terms}>
      <Header setTerms={setTerms} ttl="利用規約" back />
      
      <div className={styles.terms_inner}>
        <Body />
        {sections.map((section, index) => (
          <Section key={index} index={index + 1} section={section} />
        ))}
        <BackNumber />
      </div>
    </div>
  );
};
