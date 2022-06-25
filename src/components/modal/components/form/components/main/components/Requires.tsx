import React from "react";
import styles from "./Item.module.scss";
import root from "../Main.module.scss";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { useFormContext, useFieldArray } from "react-hook-form";

import { Data } from "functions/_form";

export const Requires: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Data["matter"]>();

  const {
    fields: requiresFields,
    append: requiresAppend,
    remove: requiresRemove,
  } = useFieldArray({
    control,
    name: "requires",
  });

  return (
    <div className={root.main_col}>
      {requiresFields.map((field, index) => (
        <div key={field.id} className={`${styles.item} ${styles.item_field}`}>
          <input
            placeholder=""
            className={`${styles.item_input} ${
              errors.requires?.[index]?.require && styles.item_input_error
            }`}
            {...register(`requires.${index}.require` as const, {
              required: index === 0 && {
                value: true,
                message: "項目を入力してください",
              },
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              minLength: {
                value: 6,
                message: "6文字以上で入力してください",
              },
              maxLength: {
                value: 144,
                message: "144文字以内で入力してください",
              },
            })}
          />

          <div className={`${styles.item_btn} ${styles.item_btn_col}`}>
            {index !== 0 && (
              <button
                type="button"
                className={styles.item_btn_remove}
                onClick={() => requiresRemove(index)}
              >
                <RemoveIcon className={styles.item_btn_icon} />
              </button>
            )}
            {index === requiresFields.length - 1 && index < 6 && (
              <button
                type="button"
                className={styles.item_btn_add}
                onClick={() => requiresAppend({ require: "" })}
              >
                <AddIcon className={styles.item_btn_icon} />
              </button>
            )}
          </div>

          {errors?.requires?.[index]?.require?.message && (
            <span className={styles.item_error}>
              {errors.requires[index].require?.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
