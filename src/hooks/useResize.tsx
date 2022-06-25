import { useEffect, useState, useRef } from "react";

export const useResize = (
  observe: unknown
): [resize: boolean, inner: React.RefObject<HTMLDivElement>] => {
  const inner = useRef<HTMLDivElement>(null);

  const [resize, setResize] = useState(false);

  useEffect(() => {
    const resizeObserver = () => {
      if (inner?.current) {
        const innerHeight = inner.current.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        innerHeight > windowHeight ? setResize(true) : setResize(false);
      }
    };

    const observer = new ResizeObserver(() => {
      resizeObserver();
    });

    const ref = inner?.current;

    window.addEventListener("resize", () => {
      resizeObserver();
    });

    ref && observer?.observe(ref);

    return () => {
      window.removeEventListener("resize", resizeObserver);
      ref && observer.disconnect();
    };
  }, [inner, resize, observe]);

  return [resize, inner];
};
