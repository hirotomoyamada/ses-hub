import styles from "../Auth.module.scss";
import { useEffect, useRef } from "react";

export const useResize = () => {
  const form = useRef();
  const inner = useRef();

  const resize = () => {
    if (
      JSON.stringify(inner?.current?.getBoundingClientRect().height) >
      window.innerHeight
    ) {
      form?.current?.classList.add(styles.auth_block);
      inner?.current?.classList.add(styles.auth_inner_block);
    } else {
      form?.current?.classList.remove(styles.auth_block);
      inner?.current?.classList.remove(styles.auth_inner_block);
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return [form, inner];
};
