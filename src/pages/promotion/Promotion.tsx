import React from "react";
import styles from "./Promotion.module.scss";

import { useOpen } from "hooks/useOpen";
import { useChange } from "hooks/useChange";

import { Header } from "./layouts/header/Header";
import { Fv } from "./layouts/fv/Fv";
import { Footer } from "./layouts/footer/Footer";

import { Modal } from "./components/modal/Modal";

import { What } from "./layouts/section/what/What";
import { Can } from "./layouts/section/can/Can";
import { Post } from "./layouts/section/post/Post";
import { Feature } from "./layouts/section/feature/Feature";
import { Lets } from "./layouts/section/lets/Lets";
import { Price } from "./layouts/section/price/Price";
import { Option } from "./layouts/section/option/Option";

export const Promotion: React.FC = () => {
  const [open, handleOpen, handleClose] = useOpen();
  const [fv, change] = useChange();

  return (
    <div className={styles.promotion}>
      <Modal handleClose={handleClose} open={open} />
      <Header change={change} />
      <Fv handleOpen={handleOpen} fv={fv} />

      <div className={styles.promotion_main}>
        <What />
        <Can />
        <Post handleOpen={handleOpen} />
        <Feature />
        <Option />
        <Price />
        <Lets />
      </div>

      <Footer />
    </div>
  );
};
