import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Plan = ({ type }) => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>プラン</h1>
      <p className={styles.howto_desc}>
        さまざまなプランやオプションで、アプリの機能を拡張します
      </p>
      <div className={styles.howto_container}>
        <Tag tag="プランを契約する" free paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から契約することが可能です。
            <br />
            <br />
            プランには、さまざまな期間を設けています。
            <br />
            <br />
            自分に合ったプランを選択して、アプリの機能を拡張しましょう。
          </p>
        ) : (
          <p>
            <span className={styles.howto_container_tag}>プラン</span>
            を契約するには、 このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="オプションを契約する" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から契約することが可能です。
            <br />
            <br />
            オプションを契約することで、さらにアプリを拡張することが可能です。
            <br />
            <br />
            <span className={styles.howto_container_acnt}>
              ※&nbsp;オプションを契約するには、プランを契約している必要があります。
            </span>
          </p>
        ) : (
          <p>
            <span className={styles.howto_container_tag}>オプション</span>
            を契約するには、 このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="請求先を変更する" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から、あなたが契約しているプランの
            <span className={styles.howto_container_tag}>更新する</span>
            を選択すると、
            <span className={styles.howto_container_tag}>請求先情報</span>
            が表示されます。
            <br />
            <br />
            <span className={styles.howto_container_tag}>請求先情報</span>に
            <span className={styles.howto_container_tag}>情報を更新</span>
            がありますので、そちらから変更できます。
          </p>
        ) : (
          <p>
            この<span className={styles.howto_container_tag}>アカウント</span>
            では、変更できません。
            <br />
            <br />
            このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="支払い方法を変更する" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から、あなたが契約しているプランの
            <span className={styles.howto_container_tag}>更新する</span>
            を選択すると、
            <span className={styles.howto_container_tag}>支払い方法</span>
            が表示されます。
            <br />
            <br />
            <span className={styles.howto_container_tag}>支払い方法</span>に
            <span className={styles.howto_container_tag}>支払い方法を追加</span>
            がありますので、そちらから変更できます。
          </p>
        ) : (
          <p>
            この<span className={styles.howto_container_tag}>アカウント</span>
            では、変更できません。
            <br />
            <br />
            このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="他のプランへ変更する" paid />
        {type !== "child" ? (
          <p>
            プランを変更する場合は、現在のプランをキャンセルする必要があります。
            <br />
            <br />
            キャンセルは、プランの
            <span className={styles.howto_container_tag}>更新する</span>
            から行ってください。
            <br />
            <br />
            <span className={styles.howto_container_acnt}>
              ※&nbsp;キャンセルをしても、現在のプランが満了するまで他のプランへは変更できません。
            </span>
          </p>
        ) : (
          <p>
            他の<span className={styles.howto_container_tag}>プラン</span>
            へ変更するには、 このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>

      <div className={styles.howto_container}>
        <Tag tag="キャンセルする" paid />
        {type !== "child" ? (
          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から、あなたが契約しているプランの
            <span className={styles.howto_container_tag}>更新する</span>
            を選択すると、
            <span className={styles.howto_container_tag}>現在のプラン</span>
            が表示されます。
            <br />
            <br />
            <span className={styles.howto_container_tag}>現在のプラン</span>に
            <span className={styles.howto_container_tag}>
              プランのキャンセル
            </span>
            がありますので、そちらからキャンセルすることが可能です。
          </p>
        ) : (
          <p>
            <span className={styles.howto_container_tag}>プラン</span>
            をキャンセルするには、 このアカウントを作成した
            <span className={styles.howto_container_tag}>親アカウント</span>
            から行う必要があります。
          </p>
        )}
      </div>
    </div>
  );
};
