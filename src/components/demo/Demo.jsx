import styles from "./Demo.module.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as userSlice from "../../features/user/userSlice";

export const Demo = () => {
  const demo = useSelector(userSlice.verified).demo;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    demo && setOpen(true);
  }, [demo]);

  return (
    <div className={open ? styles.open : styles.close}>
      <div className={styles.overlay}></div>
      <div className={styles.demo}>
        <span className={styles.demo_title}>ようこそ！SES_HUB&nbsp;へ</span>

        <p className={styles.demo_body}>
          このアカウントでは、<span>アプリの機能や操作を体験できます</span>
          <span className={styles.demo_body_desc}>
            投稿・プロフィールを編集しても、サーバーには保存されません
          </span>
          <span className={styles.demo_body_desc}>
            アプリを更新・閉じたりするとデータは消去されます
          </span>
        </p>

        <div className={styles.demo_wrap}>
          <p>機能&nbsp;に制限がございます</p>
          <ul>
            <li>投稿&nbsp;作成</li>
            <li>お問い合わせ</li>
            <li>メールアドレス&nbsp;変更</li>
            <li>パスワード&nbsp;変更</li>
            <li>ソーシャルログイン</li>
            <li>プラン&nbsp;お申し込み</li>
            <li>プラン&nbsp;更新</li>
            <li>アカウント削除</li>
          </ul>
        </div>

        <button
          type="button"
          className={styles.demo_btn}
          onClick={() => setOpen(false)}
        >
          とじる
        </button>
      </div>
    </div>
  );
};
