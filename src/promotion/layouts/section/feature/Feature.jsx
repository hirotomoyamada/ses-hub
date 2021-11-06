import root from "../Section.module.scss";
import styles from "./Feature.module.scss";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

export const Feature = () => {
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
              <td>案件・人材登録</td>

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
              <td>情報検索</td>

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
              <td>外部へ出力</td>

              <td>
                <ChangeHistoryIcon
                  className={`${styles.feature_icon} ${styles.feature_icon_limited}`}
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
          </tbody>
        </table>

        <span className={styles.feature_announce}>
          ※1 ご自身の案件・人材情報は外部へ出力することが可能です。
        </span>
        <br />
        <span className={styles.feature_announce}>
          ※ 今後のアップデートにより機能は変更になる場合がございます。
        </span>
      </div>
    </section>
  );
};
