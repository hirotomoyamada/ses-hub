import styles from "./Item.module.scss";
import root from "../Main.module.scss";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { useFormContext, useFieldArray } from "react-hook-form";

export const Skills = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields: skillsFields,
    append: skillsAppend,
    remove: skillsRemove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className={root.main_col}>
      {skillsFields.map((field, index) => (
        <div key={field.id} className={styles.item}>
          <input
            placeholder="例："
            defaultValue={`skills[${index}].skill`}
            name={`skills[${index}].skill`}
            className={`${styles.item_input} ${
              errors.skills?.[index]?.skill && styles.item_input_error
            }`}
            {...register(`skills[${index}].skill`, {
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
                onClick={() => skillsRemove(index)}
              >
                <RemoveIcon className={styles.item_btn_icon} />
              </button>
            )}
            {index === skillsFields.length - 1 && index < 6 && (
              <button
                type="button"
                className={styles.item_btn_add}
                onClick={() => skillsAppend({ skill: "" })}
              >
                <AddIcon className={styles.item_btn_icon} />
              </button>
            )}
          </div>

          <span className={styles.item_error}>
            {errors.skills?.[index]?.skill.message}
          </span>
        </div>
      ))}
    </div>
  );
};
