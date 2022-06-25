import React, { useState } from "react";
import styles from "./Btn.module.scss";

import { Link } from "react-router-dom";

interface PropType {
  type: string;
  txt: string;
  src?: string;
  command?: string[];
  func?: (() => void)[] | (() => void);
}

export const Btn: React.FC<PropType> = ({ type, txt, command, func, src }) => {
  const [open, setOpen] = useState(false);

  const handleCommand = (func: () => void): void => {
    func();
    setOpen(!open);
  };

  return (
    <>
      {type !== "link" ? (
        <button
          type="button"
          className={`${styles.btn} ${type === "create" && styles.btn_create} ${
            type === "delete" && styles.btn_delete
          } ${type === "plan" && styles.btn_plan}`}
          onClick={
            type !== "setting" && func
              ? (func as () => void)
              : () => setOpen(!open)
          }
        >
          {txt}
        </button>
      ) : (
        src && (
          <Link
            to={src}
            target="_blank"
            className={`${styles.btn} ${styles.btn_link}`}
          >
            {txt}
          </Link>
        )
      )}

      {open && (
        <>
          <div className={styles.command}>
            {command?.map((txt, index) => (
              <button
                key={index}
                type="button"
                className={styles.command_btn}
                onClick={() =>
                  func && handleCommand((func as (() => void)[])[index])
                }
              >
                {txt}
              </button>
            ))}
          </div>

          <div
            onClick={() => setOpen(!open)}
            className={styles.command_overlay}
          ></div>
        </>
      )}
    </>
  );
};
