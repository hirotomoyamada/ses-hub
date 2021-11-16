import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import { useFormContext } from "react-hook-form";

export const Type = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.type}>
      <input
        type="radio"
        {...register("type")}
        id="individual"
        name="type"
        value="individual"
      />
      <label
        htmlFor="individual"
        className={`${styles.type_btn} ${styles.type_btn_individual}`}
      >
        <span>個人</span>

        <FontAwesomeIcon
          icon={faQuestionCircle}
          className={styles.type_btn_icon}
        />
      </label>

      <input
        type="radio"
        {...register("type")}
        id="parent"
        name="type"
        value="parent"
      />
      <label
        htmlFor="parent"
        className={`${styles.type_btn} ${styles.type_btn_parent}`}
      >
        <span>法人</span>

        <FontAwesomeIcon
          icon={faQuestionCircle}
          className={styles.type_btn_icon}
        />
      </label>

      {errors.type?.message && (
        <span className={root.auth_error}>{errors.type?.message}</span>
      )}
    </div>
  );
};
