import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { usePostalJp } from "use-postal-jp";

export const Address = () => {
  const { address, pending, setPostalCode } = usePostalJp();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const postal = watch("postal");

  useEffect(() => {
    setPostalCode(postal);
  }, [setPostalCode, postal]);

  return (
    <>
      <span className={styles.create_tag}>住所</span>
      <div className={root.auth_col}>
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
          <span className={root.auth_error}>{errors.postal?.message}</span>
        </div>
        <div>
          <input
            className={`${root.auth_input} ${
              errors.adress && root.auth_input_error
            }`}
            placeholder="東京都新宿区新宿4-3-15 レイフラット新宿B 3F THE HUB"
            defaultValue={
              !pending
                ? `${address.prefecture ? address.prefecture : ""}${
                    address.address1 ? address.address1 : ""
                  }${address.address2 ? address.address2 : ""}${
                    address.address3 ? address.address3 : ""
                  }${address.address4 ? address.address4 : ""}`
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
          <span className={root.auth_error}>{errors.adress?.message}</span>
        </div>
      </div>
    </>
  );
};
