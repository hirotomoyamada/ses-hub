import styles from "./Btn.module.scss";

export const Btn = ({ type, txt, func }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${type === "create" && styles.btn_create} ${
        type === "delete" && styles.btn_delete
      } ${type === "plan" && styles.btn_plan}`}
      onClick={func}
    >
      {txt}
    </button>
  );
};
