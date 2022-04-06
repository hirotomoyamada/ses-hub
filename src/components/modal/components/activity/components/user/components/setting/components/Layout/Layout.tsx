import React from "react";
import root from "../../Setting.module.scss";

import { Btn } from "./components/Btn";
import { Sample } from "./components/Sample";

import { Activity } from "features/user/initialState";

interface PropType {
  offsetWidth?: number;
  activity: Activity;
}

export const Layout: React.FC<PropType> = ({ offsetWidth, activity }) => {
  return (
    <div
      className={`
        ${root.setting_container} 
        ${root.setting_container_layout}
      `}
    >
      <p className={root.setting_container_ttl}>レイアウト</p>

      <Btn />

      <Sample offsetWidth={offsetWidth} activity={activity} />
    </div>
  );
};
