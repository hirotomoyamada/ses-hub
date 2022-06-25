import React from "react";
import root from "../Section.module.scss";
import styles from "./Feature.module.scss";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

export const Feature: React.FC = () => {
  return (
    <section className={`${styles.feature} ${root.section}`}>
      <div className={`${root.section_inner} ${root.section_inner_content}`}>
        <h1 className={`${styles.feature_ttl} ${root.section_ttl}`}>機能</h1>

        <p className={`${styles.feature_desc} ${root.section_desc}`}>
          有料プランは、すべての機能が使えます
        </p>

        <table className={styles.feature_table}>
          <thead>
            <tr>
              <th>機能</th>
              <th className={styles.feature_table_free}>
                無料<span className={styles.feature_none}>プラン</span>
              </th>
              <th>
                有料<span className={styles.feature_none}>プラン</span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>案件・人材を登録</td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>
                <span
                  className={`${styles.feature_tag} ${styles.feature_tag_acnt}`}
                >
                  \&nbsp;Renewal&nbsp;/
                </span>
                情報を検索
              </td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>
                <span
                  className={`${styles.feature_tag} ${styles.feature_tag_acnt}`}
                >
                  \&nbsp;Renewal&nbsp;/
                </span>
                案件・人材を閲覧
              </td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
                <span className={styles.feature_icon_desc}>※1</span>
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>案件・人材へ問い合わせ</td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>新着投稿の通知</td>

              <td>
                <ChangeHistoryIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_limited}`}
                />
                <span className={styles.feature_icon_desc}>※2</span>
              </td>

              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>外部へ出力</td>

              <td>
                <ChangeHistoryIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_limited}`}
                />
                <span className={styles.feature_icon_desc}>※3</span>
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>
                <span className={styles.feature_tag}>\&nbsp;New&nbsp;/</span>
                アクティビティ
              </td>

              <td>
                <ChangeHistoryIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_limited}`}
                />
                <span className={styles.feature_icon_desc}>※4</span>
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>
                <span className={styles.feature_tag}>\&nbsp;New&nbsp;/</span>
                アナリティクス
              </td>

              <td>
                <CloseIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_disable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
                <span className={styles.feature_icon_desc}>※5</span>
              </td>
            </tr>

            <tr>
              <td>フォロー</td>

              <td>
                <CloseIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_disable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>フリーランスへアプローチ</td>

              <td>
                <CloseIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_disable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
                <span className={styles.feature_icon_desc}>※6</span>
              </td>
            </tr>

            <tr>
              <td>情報共有(SNS連絡先など)</td>

              <td>
                <CloseIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_disable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
              </td>
            </tr>

            <tr>
              <td>グループアカウント</td>

              <td>
                <CloseIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_disable}`}
                />
              </td>
              <td>
                <RadioButtonUncheckedIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_enable}`}
                />
                <span className={styles.feature_icon_desc}>※7</span>
              </td>
            </tr>
          </tbody>
        </table>

        <span className={styles.feature_announce}>
          ※1&nbsp;無料プランは、月&nbsp;10&nbsp;回まで閲覧可能です。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※2&nbsp;無料プランは、新着投稿の通知を受け取ることが出来ても、ご自身の投稿は他のユーザーに通知されません。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※3&nbsp;ご自身の案件・人材情報は外部へ出力することが可能です。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※4&nbsp;投稿の閲覧数のみ表示されます。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※5&nbsp;別途オプションの加入が必要です。
          <span className={styles.feature_announce_desc}>
            法人契約なら、こちらのオプションは標準でご利用いただけます！
          </span>
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※6&nbsp;別途オプションの加入が必要です。
          <span className={styles.feature_announce_desc}>
            今なら無料体験中 !
          </span>
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※7&nbsp;複数のアカウントを登録・管理するには法人契約へのお申し込みが必要です。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※&nbsp;アップデートにより機能は予告なく変更になる場合がございます。
        </span>
      </div>
    </section>
  );
};
