import styles from "./Promotion.module.scss";

import { useEffect, useState, useRef } from "react";

import { Header } from "./layouts/header/Header";
import { Fv } from "./layouts/fv/Fv";
import { What } from "./layouts/section/what/What";
import { Can } from "./layouts/section/can/Can";
import { Post } from "./layouts/section/post/Post";
import { Plan } from "./layouts/section/plan/Plan";
import { Footer } from "./layouts/footer/Footer";
import { Lets } from "./layouts/section/lets/Lets";

import { Modal } from "./components/modal/Modal";

export const Promotion = () => {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);

  const fv = useRef();

  useEffect(() => {
    const changeHeader = () => {
      if (
        JSON.stringify(
          fv.current && fv.current.getBoundingClientRect().height
        ) -
          96 <
        window.scrollY
      ) {
        setChange(true);
      } else {
        setChange(false);
      }
    };
    window.addEventListener("scroll", changeHeader);

    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    document.body.classList.add("lock");
  };

  const handleClose = () => {
    setOpen(!open);
    document.body.classList.remove("lock");
  };

  return (
    <div className={styles.promotion}>
      <Modal handleClose={handleClose} open={open} />
      <Header change={change} />
      <Fv handleOpen={handleOpen} fv={fv} />

      <div className={styles.promotion_main}>
        <What />
        <Can />
        <Post handleOpen={handleOpen} />
        <Plan />
        <Lets />
      </div>

      <Footer handleOpen={handleOpen} />
    </div>
  );
};
