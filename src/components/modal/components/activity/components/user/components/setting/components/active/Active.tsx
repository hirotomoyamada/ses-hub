import React, { useEffect, useState } from "react";
import root from "../../Setting.module.scss";
import styles from "./Active.module.scss";

import { useDnD } from "hooks/useDnd";
import { useFormContext, FieldError } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

import { Activity } from "features/user/initialState";
import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";
import { Setting } from "types/user";

interface PropType {
  setting?: Setting;
  activity: Activity;
}

export const Active: React.FC<PropType> = ({ setting, activity }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Data>();
  const [updateActivity, setUpdateActivity] = useState<Activity>(activity);
  const [data, order] = useDnD<Activity[number]>(updateActivity);

  const active = watch("active");

  useEffect(() => {
    if (order?.length) {
      setValue("order", order);
    }
  }, [order]);

  useEffect(() => {
    if (setting?.activity?.order) {
      const newActivity = setting.activity.order
        .map((key) => activity.find((data) => data.key === key))
        .filter((data): data is Activity[number] => data !== undefined);

      setUpdateActivity(newActivity);
    }
  }, [setting?.activity]);

  return (
    <div
      className={`
        ${root.setting_container} 
        ${root.setting_container_label}
      `}
    >
      <p className={root.setting_container_ttl}>表示・並び順</p>

      {data.map((activity) => (
        <div key={activity.key} className={styles.active} {...activity.events}>
          <div className={styles.active_ttl}>
            <FontAwesomeIcon
              icon={faGrip as IconProp}
              className={styles.active_ttl_icon}
            />
            <p className={styles.active_ttl_txt}>{activity.data.label}</p>
          </div>

          <input
            type="checkbox"
            id={activity.key}
            {...register("active", {
              required: {
                value: true,
                message: "選択してください",
              },
            })}
            value={activity.key}
            className={`${root.toggle}`}
          />
          <label
            className={`
              ${root.toggle_label} 
              ${active.length <= 1 && root.toggle_disabled}
            `}
            htmlFor={activity.key}
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
