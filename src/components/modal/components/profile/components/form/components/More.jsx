import styles from "../Form.module.scss";
import { useFormContext } from "react-hook-form";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const More = () => {
  const { register, watch } = useFormContext();

  const region = watch("region");
  const more = watch("more");

  const [open, setOpen] = useState(false);
  const [regionDisabled, setRegionDisabled] = useState(false);
  const [moreDisabled, setMoreDisabled] = useState(false);

  useEffect(() => {
    setRegionDisabled(region?.length >= 3);
    setMoreDisabled(more?.length >= 1);
  }, [more?.length, region?.length]);

  return (
    <div className={styles.form_col}>
      <button type="button" onClick={() => setOpen(!open)}>
        <div className={`${styles.form_row} ${styles.form_row_more}`}>
          <span className={`${styles.form_tag} ${styles.form_tag_more}`}>
            得意な案件・人材領域
          </span>

          <FontAwesomeIcon
            icon={faChevronRight}
            className={`${styles.form_icon_open} ${
              open && styles.form_icon_close
            }`}
          />
        </div>
      </button>

      {open && (
        <>
          <div className={styles.form_mores}>
            <input
              type="checkbox"
              id="more1"
              {...register("more")}
              value="案件元"
              className={`${styles.form_mores_more} ${
                moreDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                moreDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="more1"
            >
              案件元が多い
            </label>

            <input
              type="checkbox"
              id="more2"
              {...register("more")}
              value="人材元"
              className={`${styles.form_mores_more} ${
                moreDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                moreDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="more2"
            >
              人材元が多い
            </label>
            <span className={styles.form_tag_desc}>※&nbsp;1つ選択できます</span>
          </div>

          <div className={styles.form_mores}>
            <input
              type="checkbox"
              id="region1"
              {...register("region")}
              value="コンサル"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region1"
            >
              コンサル
            </label>

            <input
              type="checkbox"
              id="region2"
              {...register("region")}
              value="アド"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region2"
            >
              アド
            </label>

            <input
              type="checkbox"
              id="region3"
              {...register("region")}
              value="クリエイティブ"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region3"
            >
              クリエイティブ
            </label>

            <input
              type="checkbox"
              id="region4"
              {...register("region")}
              value="開発"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region4"
            >
              開発
            </label>

            <input
              type="checkbox"
              id="region5"
              {...register("region")}
              value="運用保守"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region5"
            >
              運用保守
            </label>

            <input
              type="checkbox"
              id="region6"
              {...register("region")}
              value="サポート業務"
              className={`${styles.form_mores_more} ${
                regionDisabled && styles.form_mores_more_disabled
              }`}
            />
            <label
              className={`${styles.form_mores_more_label} ${
                regionDisabled && styles.form_mores_more_label_disabled
              }`}
              htmlFor="region6"
            >
              サポート業務
            </label>
            <span className={styles.form_tag_desc}>※&nbsp;3つ選択できます</span>
          </div>
        </>
      )}
    </div>
  );
};
