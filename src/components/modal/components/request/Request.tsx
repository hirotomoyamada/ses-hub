import styles from "./Request.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as userSlice from "features/user/userSlice";

import { Person } from "types/post";

interface PropType {
  handleClose: () => void;
}

type Data = {
  body: string;
};

export const Request: React.FC<PropType> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const selectUser = useSelector(userSlice.selectUser) as Person;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const body = `${selectUser?.profile?.nickName} さん、はじめまして。`;

  const handleRequset: SubmitHandler<Data> = (data) => {
    dispatch(userSlice.addRequest({ user: selectUser, body: data.body }));
  };

  return (
    <form className={styles.request} onSubmit={handleSubmit(handleRequset)}>
      <div className={styles.request_head}>
        <button onClick={handleClose} className={styles.request_head_cancel}>
          もどる
        </button>
        <p className={styles.request_head_ttl}>メッセージ</p>
      </div>

      <div className={styles.request_inner}>
        <div>
          <textarea
            className={`${styles.request_body} ${
              errors.body && styles.request_body_error
            }`}
            defaultValue={body}
            {...register("body", {
              required: {
                value: true,
                message: "メッセージを入力してください",
              },
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              minLength: {
                value: 32,
                message: "32文字以上で入力してください",
              },
              maxLength: {
                value: 360,
                message: "360文字以内で入力してください",
              },
            })}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`${styles.request_btn} ${
            errors.body && styles.request_btn_error
          }`}
        >
          {errors.body?.message ? errors.body?.message : "リクエストする"}
        </button>
      </div>
    </form>
  );
};
