import styles from "./Promotion.module.scss";
import { useOpen } from "./hook/useOpen";
import { useChange } from "./hook/useChange";

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
        <Plan />
        <Lets />
      </div>

      <Footer handleOpen={handleOpen} />
    </div>
  );
};
