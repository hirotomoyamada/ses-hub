import React from "react";
import styles from "../Create.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "../../../Auth";

interface PropType {
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Agree: React.FC<PropType> = ({ setTerms }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div className={styles.agree_checkbox}>
      <input
        type="checkbox"
        id="agree"
        value={"enable"}
        {...register("agree", {
          required: {
            value: true,
            message: "利用規約に同意してください",
          },
        })}
      />
      <label htmlFor="agree">
        <button
          type="button"
          className={styles.agree_link}
          onClick={() => setTerms(true)}
        >
          利用規約
        </button>
        に同意する
      </label>
      {errors?.agree?.message && (
        <span className={styles.agree_checkbox_error}>
          {errors.agree.message}
        </span>
      )}
    </div>
  );
};
