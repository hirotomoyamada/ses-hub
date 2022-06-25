import React from "react";
import styles from "../../HowTo.module.scss";

import { Tag } from "../tag/Tag";

interface PropType {
  type: string;
}
export const Analytics: React.FC<PropType> = ({ type }) => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>アナリティクス</h1>

      <p className={styles.howto_desc}>
        数値を可視化し、外部へ出力できるパワフルな機能です
      </p>

      {type === "individual" && (
        <div className={styles.howto_container}>
          <Tag tag="利用する" option />

          <p>
            <span className={styles.howto_container_tag}>アカウント情報</span>の
            <span className={styles.howto_container_tag}>プラン</span>
            から<span className={styles.howto_container_tag}>オプション</span>
            を契約することで利用できます
            <br />
            <br />
            <span className={styles.howto_container_acnt}>
              ※&nbsp;オプションを契約するには、プランを契約している必要があります。
            </span>
          </p>
        </div>
      )}

      <div className={styles.howto_container}>
        <Tag
          tag="した数"
          paid={type !== "individual"}
          option={type === "individual"}
        />

        <p>
          あなたが投稿やユーザーに対して
          <span className={styles.howto_container_tag}>投稿した数</span>
          <span className={styles.howto_container_tag}>閲覧した数</span>
          <span className={styles.howto_container_tag}>フォローした数</span>
          などを表示しています。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag
          tag="された数"
          paid={type !== "individual"}
          option={type === "individual"}
        />

        <p>
          あなたやあなたの投稿に対して
          <span className={styles.howto_container_tag}>閲覧された数</span>
          <span className={styles.howto_container_tag}>いいねされた数</span>
          <span className={styles.howto_container_tag}>フォローされた数</span>
          などを表示しています。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag
          tag="絞り込む"
          paid={type !== "individual"}
          option={type === "individual"}
        />

        <p>
          <span className={styles.howto_container_tag}>今日</span>
          <span className={styles.howto_container_tag}>今週</span>
          <span className={styles.howto_container_tag}>今月</span>
          <span className={styles.howto_container_tag}>すべて</span>
          を選択することで、選択した期間分だけ表示します。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;<span className={styles.howto_container_tag}>今日</span>
            を選択した場合、最大7日前まで表示されます。
          </span>
          <span className={styles.howto_container_acnt}>
            ※&nbsp;<span className={styles.howto_container_tag}>今週</span>
            を選択した場合、最大6週間前まで表示されます。
          </span>
          <span className={styles.howto_container_acnt}>
            ※&nbsp;<span className={styles.howto_container_tag}>今月</span>
            <span className={styles.howto_container_tag}>すべて</span>
            を選択した場合、最大6ヶ月まで表示されます。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag
          tag="データを出力する"
          paid={type !== "individual"}
          option={type === "individual"}
        />

        <p>
          あなたがデータで出力したい項目を
          <span className={styles.howto_container_tag}>項目</span>
          <span className={styles.howto_container_tag}>区分</span>
          <span className={styles.howto_container_tag}>期間</span>
          <span className={styles.howto_container_tag}>拡張子</span>
          から、選択することで出力できます。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;<span className={styles.howto_container_tag}>拡張子</span>の
            <span className={styles.howto_container_tag}>.csv</span>や
            <span className={styles.howto_container_tag}>.xlsx</span>
            は、デバイスやOSによっては文字が正しく表示されない場合があります。その場合は、
            <span className={styles.howto_container_tag}>文字コード</span>
            をデバイス内のアプリなどで変換してください。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag
          tag="設定"
          paid={type !== "individual"}
          option={type === "individual"}
        />

        <p>
          あなたが好む
          <span className={styles.howto_container_tag}>表示・並び順</span>
          <span className={styles.howto_container_tag}>レイアウト</span>
          <span className={styles.howto_container_tag}>カラー</span>
          を設定することができます。
          <br />
          <br />
          保存された内容は、ログアウトされても保持されています。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;
            <span className={styles.howto_container_tag}>表示・並び順</span>
            は、デバイス(主にスマートフォン)よって操作ができない場合があります。その場合は、PCなど他のデバイスで操作をしてください。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="グラフが正しく表示されない" />

        <p>
          <span className={styles.howto_container_acnt}>
            デバイスのスペックによって
            <span className={styles.howto_container_tag}>グラフ</span>
            が崩れる・正しく表示されない場合があります。
            <br />
            <br />
            他のデバイスをお使いになるか、再度ページを更新してください。
          </span>
        </p>
      </div>
    </div>
  );
};
