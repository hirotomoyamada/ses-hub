import styles from "./Outputs.module.scss";

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { handleAnnounce } from "../../../userSlice";
import { Modal } from "./components/modal/Modal";
import { Menu } from "./components/menu/Menu";
import { matters } from "./functions/matters";
import { resources } from "./functions/resources";

export const Outputs = ({
  index,
  selectOutputs,
  handleClose,
  handleDelete,
}) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [copy, setCopy] = useState(false);
  const [open, setOpen] = useState(false);

  const outputs =
    index === "matters"
      ? matters({ selectOutputs })
      : index === "resources" && resources({ selectOutputs });

  const handleCopy = () => {
    setCopy(true);
    dispatch(
      handleAnnounce({
        type: "success",
        text: "クリップボードにコピーしました",
      })
    );
    setTimeout(() => setCopy(false), 2000);
  };

  const Outputs = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} className={styles.outputs_inner}>
        <p className={styles.outputs_txt}>{outputs}</p>
      </div>
    );
  });

  return (
    <div className={styles.outputs}>
      <Outputs ref={componentRef} />

      <Modal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Menu
        outputs={outputs}
        open={open}
        setOpen={setOpen}
        copy={copy}
        handleCopy={handleCopy}
        handlePrint={handlePrint}
      />
    </div>
  );
};
