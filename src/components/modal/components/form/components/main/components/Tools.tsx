import React from "react";
import styles from "./Item.module.scss";
import root from "../Main.module.scss";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { useFormContext, useFieldArray } from "react-hook-form";

import { Data } from "functions/_form";

interface PropType {
  index: "matters" | "resources";
}

export const Tools: React.FC<PropType> = ({ index }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Data["matter"] & Data["resource"]>();

  const {
    fields: toolsFields,
    append: toolsAppend,
    remove: toolsRemove,
  } = useFieldArray({
    control,
    name: "tools",
  });

  return (
    <div className={root.main_col}>
      <div className={root.main_grid}>
        {toolsFields.map((field, i) => (
          <div key={field.id} className={styles.item}>
            <input
              placeholder="ツール"
              className={`${styles.item_input} ${
                errors.tools?.[i]?.tool && styles.item_input_error
              }`}
              {...register(`tools.${i}.tool` as const, {
                pattern: {
                  value: /^\S+/,
                  message: "先頭にスペースは使えません",
                },
                minLength: {
                  value: 2,
                  message: "2文字以上で入力してください",
                },
                maxLength: {
                  value: 16,
                  message: "16文字以内で入力してください",
                },
              })}
            />

            <div className={styles.item_btn}>
              {i !== 0 && (
                <button
                  type="button"
                  className={styles.item_btn_remove}
                  onClick={() => toolsRemove(i)}
                >
                  <RemoveIcon className={styles.item_btn_icon} />
                </button>
              )}

              {index === "matters" && i === toolsFields.length - 1 && i < 4 && (
                <button
                  type="button"
                  className={styles.item_btn_add}
                  onClick={() => toolsAppend({ tool: "" })}
                >
                  <AddIcon className={styles.item_btn_icon} />
                </button>
              )}
              
              {index === "resources" && i === toolsFields.length - 1 && i < 9 && (
                <button
                  type="button"
                  className={styles.item_btn_add}
                  onClick={() => toolsAppend({ tool: "" })}
                >
                  <AddIcon className={styles.item_btn_icon} />
                </button>
              )}
            </div>

            {errors?.tools?.[i]?.tool?.message && (
              <span className={styles.item_error}>
                {errors.tools[i].tool?.message}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
