import styles from "./Btn.module.scss";

import { useState } from "react";

export const Btn = ({ type, txt, command, func }) => {
  const [open, setOpen] = useState(false);

  const handleCommand = (func) => {
    func();
    setOpen(!open);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.btn} ${type === "create" && styles.btn_create} ${
          type === "delete" && styles.btn_delete
        } ${type === "plan" && styles.btn_plan}`}
        onClick={type !== "setting" ? func : () => setOpen(!open)}
      >
        {txt}
      </button>

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
