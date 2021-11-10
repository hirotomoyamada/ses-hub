import { useHistory } from "react-router";
import styles from "./Btn.module.scss";

export const Btn = ({ create, reset, remove, plan }) => {
  const history = useHistory();

  const handlePlan = () => {
    history.push("/plan");
  };

  const handleCreate = () => {};

  const handleReset = () => {};
  
  const handleRemove = () => {};

  return (
    <button
      type="button"
      className={`${styles.btn} ${create && styles.btn_create} ${
        remove && styles.btn_remove
      } ${plan && styles.btn_plan}`}
      onClick={
        plan
          ? handlePlan
          : create
          ? handleCreate
          : reset
          ? handleReset
          : remove && handleRemove
      }
    >
      {plan
        ? "プランの変更"
        : create
        ? "作成"
        : reset
        ? "パスワード再設定"
        : remove && "削除"}
    </button>
  );
};
