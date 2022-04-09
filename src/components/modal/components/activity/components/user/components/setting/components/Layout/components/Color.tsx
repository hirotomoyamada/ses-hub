import React, { useState, useMemo } from "react";
import root from "../../../Setting.module.scss";
import styles from "../Layout.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "components/modal/components/activity/components/user/components/setting/Setting";

export const Color = () => {
  const [display, setDisplay] = useState("self");
  const { register, watch } = useFormContext<Data>();

  const color = watch("color");

  const Palette: React.VFC = useMemo<React.VFC>(
    (): React.VFC => (): JSX.Element => {
      const types: ("self" | "others")[] = ["self", "others"];
      const colors = [
        { name: "green", code: "#49b657" },
        { name: "orange", code: "#ff9900" },
        { name: "red", code: "#e94235" },
        { name: "blue", code: "#1d9bf0" },
        { name: "purple", code: "#b749a9" },
        { name: "brown", code: "#b78e49" },
      ];

      return (
        <>
          {types.map((type) => {
            if (display === type)
              return (
                <div key={type} className={styles.wrap}>
                  {colors.map((color, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        id={`${type}_${color.name}`}
                        {...register(`color.${type}`)}
                        value={color.code}
                        className={`${root.radio}`}
                      />
                      <label
                        className={`${root.radio_color} ${
                          root[`radio_${color.name}`]
                        }`}
                        htmlFor={`${type}_${color.name}`}
                      ></label>
                    </div>
                  ))}
                </div>
              );
          })}
        </>
      );
    },
    [display]
  );

  return (
    <div className={root.setting_wrap}>
      <p className={root.setting_container_ttl}>カラー</p>

      <div className={styles.container}>
        <p className={styles.container_ttl}>現在の色</p>

        <div className={`${styles.wrap} ${styles.wrap_display}`}>
          <button
            type="button"
            className={root.btn}
            style={
              display === "self"
                ? { background: color?.self || "#49b657", opacity: 1 }
                : { background: color?.self || "#49b657", opacity: 0.4 }
            }
            onClick={() => setDisplay("self")}
          >
            した数
          </button>

          <button
            type="button"
            className={root.btn}
            style={
              display === "others"
                ? { background: color?.others || "#ff9900", opacity: 1 }
                : { background: color?.others || "#ff9900", opacity: 0.4 }
            }
            onClick={() => setDisplay("others")}
          >
            された数
          </button>
        </div>

        <p className={styles.container_ttl}>変更する色</p>

        <Palette />
      </div>
    </div>
  );
};
