import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Position = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${root.main_grid} ${root.main_grid_mid}`}>
      <div className={`${root.main_col} ${root.main_col_mid}`}>
        <span className={root.main_tag}>ポジション</span>
        <div className={`${styles.item} ${styles.item_select}`}>
          <select
            className={`${styles.item_input} ${
              errors.position && styles.item_input_error
            }`}
            {...register("position", {
              required: {
                value: true,
                message: "ポジションを選択してください",
              },
            })}
          >
            <option value="フロントエンドエンジニア">
              フロントエンドエンジニア
            </option>
            <option value="バックエンドエンジニア">
              バックエンドエンジニア
            </option>
            <option value="iOS/Androidエンジニア">iOS/Androidエンジニア</option>
            <option value="サーバーサイドエンジニア">
              サーバーサイドエンジニア
            </option>
            <option value="インフラエンジニア">インフラエンジニア</option>
            <option value="セキュリティエンジニア">
              セキュリティエンジニア
            </option>
            <option value="システムエンジニア">システムエンジニア</option>
            <option value="マークアップエンジニア">
              マークアップエンジニア
            </option>
            <option value="テストエンジニア">テストエンジニア</option>
            <option value="テスター">テスター</option>
            <option value="PM/PL">PM/PL</option>
            <option value="リードエンジニア">リードエンジニア</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Webディレクター">Webディレクター</option>
            <option value="Webデザイナー">Webデザイナー</option>
            <option value="Webプランナー">Webプランナー</option>
            <option value="ゲームプランナー">ゲームプランナー</option>
            <option value="ゲームデザイナー">ゲームデザイナー</option>
            <option value="ITコンサルタント">ITコンサルタント</option>
            <option value="PMO">PMO</option>
            <option value="SAP">SAP</option>
            <option value="サポート">サポート</option>
            <option value="その他">その他</option>
          </select>

          {errors.position?.message && (
            <span className={styles.item_error}>
              {errors.position?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
