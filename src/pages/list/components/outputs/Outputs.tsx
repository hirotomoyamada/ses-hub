import React, { useState, useRef } from "react";
import styles from "./Outputs.module.scss";

import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";

import * as rootSlice from "features/root/rootSlice";

import { Menu } from "./components/menu/Menu";

import * as functions from "functions";

import { Matter, Resource } from "types/post";

interface PropType {
  index: "matters" | "resources";
  posts: Matter[] | Resource[];
  handleBack: () => void;
}

export const Outputs: React.FC<PropType> = ({ index, posts, handleBack }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [copy, setCopy] = useState(false);

  const outputs =
    index === "matters"
      ? functions.output.matters(posts as Matter[])
      : index === "resources"
      ? functions.output.resources(posts as Resource[])
      : undefined;

  const handleCopy = () => {
    setCopy(true);
    dispatch(
      rootSlice.handleAnnounce({
        success: "クリップボードにコピーしました",
      })
    );
    setTimeout(() => setCopy(false), 2000);
  };

  const Outputs = React.forwardRef<HTMLDivElement>((props, ref) => {
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
