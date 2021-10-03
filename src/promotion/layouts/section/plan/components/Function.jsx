import styles from "./../Plan.module.scss";
import root from "../../Section.module.scss";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

export const Function = () => {
  return (
    <div className={styles.plan_function}>
      <h1 className={`${styles.plan_ttl_sub} ${root.section_ttl_sub}`}>機能</h1>
      <h1 className={`${styles.plan_desc} ${root.section_desc}`}>
        有料プランはすべての機能が使えます
      </h1>
      <table className={styles.plan_table}>
        <thead>
          <tr>
            <th>機能</th>
            <th className={styles.plan_table_free}>
              無料<span className={styles.plan_function_none}>プラン</span>
            </th>
            <th>
              有料<span className={styles.plan_function_none}>プラン</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>案件・人材登録</td>

            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>

            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>
          </tr>

          <tr>
            <td>情報検索</td>

            <td>
              <CloseIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_disable}`}
              />
            </td>
            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>
          </tr>

          <tr>
            <td>外部へ出力</td>

            <td>
              <ChangeHistoryIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_limited}`}
              />
              <span className={styles.plan_table_price_total}>※1</span>
            </td>
            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>
          </tr>

          <tr>
            <td>フォロー</td>

            <td>
              <CloseIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_disable}`}
              />
            </td>
            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>
          </tr>
          <tr>
            <td>情報共有(SNS連絡先など)</td>

            <td>
              <CloseIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_disable}`}
              />
            </td>
            <td>
              <RadioButtonUncheckedIcon
                className={`${styles.plan_function_icon} ${styles.plan_function_icon_enable}`}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <span className={styles.plan_announce}>
        ※1 ご自身の案件・人材情報は外部へ出力することが可能です。
      </span>
      <br />
      <span className={styles.plan_announce}>
        ※ 今後のアップデートにより機能は変更になる場合がございます。
      </span>
    </div>
  );
};
