import React, { useEffect } from "react";
import root from "../../Setting.module.scss";
import styles from "./Label.module.scss";

import { useDnD } from "hooks/useDnd";
import { useFormContext } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

import { Activity } from "features/user/initialState";
import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";

interface PropType {
  activity: Activity;
}

export const Label: React.FC<PropType> = ({ activity }) => {
  const { register, setValue } = useFormContext<Data>();
  const [data, order] = useDnD<Activity[number]>(activity);

  useEffect(() => {
    setValue("order", order);
  }, [order]);

  return (
    <div
      className={`
        ${root.setting_container} 
        ${root.setting_container_label}
      `}
    >
      <p className={root.setting_container_ttl}>表示・並び順</p>

      {data.map((activity) => (
        <div key={activity.key} className={styles.label} {...activity.events}>
          <div className={styles.label_ttl}>
            <FontAwesomeIcon
              icon={faGrip as IconProp}
              className={styles.label_ttl_icon}
            />
            <p className={styles.label_ttl_txt}>{activity.data.label}</p>
          </div>

          <div className={styles.label_btn}>
            <input
              type="checkbox"
              id={activity.key}
              {...register("label")}
              value={activity.key}
              className={`${root.toggle}`}
            />
            <label
              className={`${root.toggle_label}`}
              htmlFor={activity.key}
            ></label>
          </div>
        </div>
      ))}
    </div>
  );
};
