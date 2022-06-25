import React, { useEffect, useState } from "react";
import root from "../../Setting.module.scss";
import styles from "./Active.module.scss";

import { useDnD } from "hooks/useDnd";
import { useFormContext, FieldError } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

import { Analytics } from "features/user/initialState";
import { Data } from "components/modal/components/analytics/components/setting/Setting";
import { Setting } from "types/user";

interface PropType {
  setting?: Setting;
  analytics: Analytics;
}

export const Active: React.FC<PropType> = ({ setting, analytics }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Data>();
  const [updateAnalytics, setUpdateAnalytics] = useState<Analytics>(analytics);
  const [data, order] = useDnD<Analytics[number]>(updateAnalytics);

  const active = watch("active");

  useEffect(() => {
    if (order?.length) setValue("order", order);
  }, [order]);

  useEffect(() => {
    if (setting?.analytics?.order) {
      const newAnalytics = setting.analytics.order
        .map((key) => analytics.find((data) => data.key === key))
        .filter((data): data is Analytics[number] => data !== undefined);

      setUpdateAnalytics(newAnalytics);
    }
  }, [setting?.analytics]);

  return (
    <div
      className={`
        ${root.setting_container} 
        ${root.setting_container_label}
      `}
    >
      <p className={root.setting_container_ttl}>表示・並び順</p>

      {data.map((analytics) => (
        <div
          key={analytics.key}
          className={styles.active}
          {...analytics.events}
        >
          <div className={styles.active_ttl}>
            <FontAwesomeIcon
              icon={faGrip as IconProp}
              className={styles.active_ttl_icon}
            />
            <p className={styles.active_ttl_txt}>{analytics.data.label}</p>
          </div>

          <input
            type="checkbox"
            id={analytics.key}
            {...register("active", {
              required: {
                value: true,
                message: "選択してください",
              },
            })}
            value={analytics.key}
            className={`${root.toggle}`}
          />
          <label
            className={`
              ${root.toggle_label} 
              ${active.length <= 1 && root.toggle_disabled}
            `}
            htmlFor={analytics.key}
          ></label>
        </div>
      ))}

      {(errors.active as FieldError | undefined)?.message && (
        <span className={root.setting_error}>
          {(errors.active as FieldError | undefined)?.message}
        </span>
      )}
    </div>
  );
};
