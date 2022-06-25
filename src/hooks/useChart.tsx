import { useEffect, useState, useRef } from "react";

export const useChart = (): [
  ref: React.RefObject<HTMLDivElement>,
  width: number,
  height: number
] => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const resize = () => {
      const innerWidth = window.innerWidth;

      if (ref.current) {
        if (innerWidth > 1440) {
          const columns = 4;
          const gap = 16 * (columns - 1);
          const padding = 16 * 2;
          const border = 1 * columns * 2;
          const w =
            (ref.current.offsetWidth - gap) / columns - padding - border;

          setWidth(w);
          setHeight(w / 2);

          return;
        }

        if (innerWidth > 959) {
          const columns = 3;
          const gap = 16 * (columns - 1);
          const padding = 16 * 2;
          const border = 1 * columns * 2;
          const w =
            (ref.current.offsetWidth - gap) / columns - padding - border;

          setWidth(w);
          setHeight(w / 2);

          return;
        }

        if (innerWidth > 519) {
          const columns = 2;
          const gap = 16 * (columns - 1);
          const padding = 16 * 2;
          const border = 1 * columns * 2;
          const w =
            (ref.current.offsetWidth - gap) / columns - padding - border;

          setWidth(w);
          setHeight(w / 2);

          return;
        } else {
          const columns = 1;
          const padding = 12 * 2;
          const border = 1 * columns * 2;
          const w = ref.current.offsetWidth / columns - padding - border;

          setWidth(w);
          setHeight(w / 2);

          return;
        }
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [ref]);

  return [ref, width, height];
};
