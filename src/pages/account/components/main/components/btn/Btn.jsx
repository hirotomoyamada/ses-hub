import styles from "./Btn.module.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

export const Btn = ({ type, txt, command, func, src }) => {
  const [open, setOpen] = useState(false);

  const handleCommand = (func) => {
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
          onClick={type !== "setting" ? func : () => setOpen(!open)}
        >
          {txt}
        </button>
      ) : (
        <Link
          to={src}
          target="_blank"
          className={`${styles.btn} ${styles.btn_link}`}
        >
          {txt}
        </Link>
      )}

      {open && (
        <>
          <div className={styles.command}>
            {command.map((txt, index) => (
              <button
                key={index}
                type="button"
                className={styles.command_btn}
                onClick={() => handleCommand(func[index])}
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
