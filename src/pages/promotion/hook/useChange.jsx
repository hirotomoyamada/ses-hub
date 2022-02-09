import { useEffect, useState, useRef } from "react";

export const useChange = () => {
  const [change, setChange] = useState(false);

  const fv = useRef();

  useEffect(() => {
    const changeHeader = () => {
      if (
        JSON.stringify(
          fv.current && fv.current.getBoundingClientRect().height
        ) -
          96 <
        window.scrollY
      ) {
        setChange(true);
      } else {
        setChange(false);
      }
    };
    window.addEventListener("scroll", changeHeader);

    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, []);

  return [fv, change];
};
