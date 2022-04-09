import React from "react";
import root from "../../Setting.module.scss";

import { Display } from "./components/Display";
import { Sample } from "./components/Sample";

import { Activity } from "features/user/initialState";
import { Color } from "./components/Color";

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
