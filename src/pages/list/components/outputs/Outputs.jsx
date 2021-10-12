import styles from "./Outputs.module.scss";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";

import * as rootSlice from "../../../../features/root/rootSlice";

import { Menu } from "./components/menu/Menu";
import { matters } from "./functions/matters";
import { resources } from "./functions/resources";

export const Outputs = ({ index, posts, handleBack }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [copy, setCopy] = useState(false);

  const outputs =
    index === "matters"
      ? matters({ posts })
      : index === "resources" && resources({ posts });

  const handleCopy = () => {
    setCopy(true);
    dispatch(
      rootSlice.handleAnnounce({
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

      <Menu
        outputs={outputs}
        copy={copy}
        handleBack={handleBack}
        handleCopy={handleCopy}
        handlePrint={handlePrint}
      />
    </div>
  );
};
