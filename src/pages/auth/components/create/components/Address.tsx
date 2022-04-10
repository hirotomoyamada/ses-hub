import React from "react";
import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";
import { usePostalJp } from "use-postal-jp";

import { Data } from "../../../Auth";

export const Address: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Data>();

  const postal = watch("postal");
  const type = watch("type");

  const [address, loading] = usePostalJp(postal, postal?.length >= 7);

  return (
    <div className={root.auth_col}>
      <span className={styles.create_tag}>
        住所
        {type === "individual" && (
          <span className={styles.create_tag_desc}>
            &nbsp;※&nbsp;オフィスが無い場合は、自宅の住所を入力してください
          </span>
        )}
      </span>

      <div>
        <input
          className={`${root.auth_input} ${root.auth_input_min} ${
            errors.postal && root.auth_input_error
          }`}
          placeholder="160-0022"
          {...register("postal", {
            pattern: {
              value: /^\d{3}-\d{4}$/,
              message: "正しい郵便番号を入力してください",
            },
            maxLength: {
              value: 8,
              message: "8文字以内で入力してください",
            },
          })}
        />

        {errors?.postal?.message && (
          <span className={root.auth_error}>{errors.postal.message}</span>
        )}
      </div>

      <div>
        <input
          className={`${root.auth_input} ${
            errors?.address && root.auth_input_error
          }`}
          placeholder="東京都新宿区新宿4-3-15 レイフラット新宿B 3F THE HUB"
          defaultValue={
            !loading
              ? `${address?.prefecture ? address.prefecture : ""}${
                  address?.address1 ? address.address1 : ""
                }${address?.address2 ? address.address2 : ""}${
                  address?.address3 ? address.address3 : ""
                }${address?.address4 ? address.address4 : ""}`
              : "検索中"
          }
          {...register("address", {
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            minLength: {
              value: 8,
              message: "8文字以上で入力してください",
            },
            maxLength: {
              value: 64,
              message: "64文字以内で入力してください",
            },
          })}
        />

        {errors?.address?.message && (
          <span className={root.auth_error}>{errors.address.message}</span>
        )}
      </div>
    </div>
  );
};
