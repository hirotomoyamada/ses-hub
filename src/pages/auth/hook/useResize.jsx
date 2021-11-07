import { useEffect, useState, useRef } from "react";

export const useResize = (verified) => {
  const form = useRef();
  const inner = useRef();

  const [resize, setResize] = useState(false);

  useEffect(() => {
    const resizeObserver = () => {
      const innerHeight = inner?.current?.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      innerHeight > windowHeight ? setResize(true) : setResize(false);
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
      ref && observer.disconnect(ref);
    };
  }, [inner, resize, verified]);

  return [resize, form, inner];
};
