import { useEffect, useState, useRef } from "react";

export const useChange = (): [
  fv: React.RefObject<HTMLDivElement>,
  change: boolean
] => {
  const [change, setChange] = useState(false);

  const fv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeHeader = () => {
      if (fv?.current) {
        const headerHeight = 96;
        const fvHeight = fv.current.getBoundingClientRect().height;
        const scrollY = window.scrollY;

        if (fvHeight - headerHeight < scrollY) {
          setChange(true);
        } else {
          setChange(false);
        }
      }
    };

    window.addEventListener("scroll", changeHeader);

    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, []);

  return [fv, change];
};
