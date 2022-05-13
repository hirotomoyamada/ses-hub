import React from "react";
import root from "../../Setting.module.scss";

import { Display } from "./Display";
import { Sample } from "./Sample";
import { Color } from "./Color";

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
      <Display />
      <Color />

      <Sample offsetWidth={offsetWidth} activity={activity} />
    </div>
  );
};
