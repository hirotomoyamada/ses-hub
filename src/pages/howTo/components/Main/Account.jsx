import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Account = ({ type }) => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>グループアカウント</h1>
      <p className={styles.howto_desc}>
        プランに応じて、グループアカウントを作成できます
      </p>

      <div className={styles.howto_container}>
        <Tag tag="グループアカウントを作成する" paid />
        {type !== "child" ? (
          <p>
            契約しているプランの内容によって、グループアカウントを作成できます。
            <br />
            <br />
            グループアカウントの作成できる数は、
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            で確認できます。
            <br />
            <br />
            グループアカウントを作成するには、
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            から作成できます。
            <br />
            <br />
            作成したグループアカウントは、あなたのアカウントと同じ機能が使えます。あなたが、
            <span className={styles.howto_container_tag}>プラン</span>
            <span className={styles.howto_container_tag}>オプション</span>
            を更新・キャンセルすると自動的に反映されます。
          </p>
        ) : (
          <p>
            この<span className={styles.howto_container_tag}>アカウント</span>
            では、作成することができません。
            <br />
            <br />
            このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="グループアカウントを削除する" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            から削除できます。
            <br />
            <br />
            <span className={styles.howto_container_acnt}>
              ※
              一度削除したアカウントは、復元することができませんのでご注意ください。
            </span>
          </p>
        ) : (
          <p>
            この<span className={styles.howto_container_tag}>アカウント</span>
            では、削除することができません。
            <br />
            <br />
            このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="パスワードを再設定する" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            <span className={styles.howto_container_tag}>
              パスワードを再設定
            </span>
            から行えます。
          </p>
        ) : (
          <p>
            この<span className={styles.howto_container_tag}>アカウント</span>
            では、パスワードの再設定を行うことができません。
            <br />
            <br />
            このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      {type !== "child" && (
        <div className={styles.howto_container}>
          <Tag tag="グループアカウントの上限について" paid />
          <p>
            グループアカウントの作成できる上限は、
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            で確認できます。
            <br />
            <br />
            現在の<span className={styles.howto_container_tag}>プラン</span>
            をキャンセルしても、
            <span className={styles.howto_container_tag}>
              グループアカウント
            </span>
            の情報は保持されます。
            <br />
            <br />
            <span className={styles.howto_container_acnt}>
              ※
              再度、プランを契約する場合は、保持しているグループアカウント数以上のプランを契約する必要があります。
              <br />
              <br />※
              グループアカウント数以下のプランを契約されたい場合は、契約されたいプランの上限までグループアカウントを削除する必要があります。
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
