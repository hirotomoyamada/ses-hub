import { useEffect, useState, useRef } from "react";

export const useResize = () => {
  const form = useRef();
  const inner = useRef();

  const [resize, setResize] = useState(false);

  useEffect(() => {
    const resize = () => {
      const innerHeight = inner?.current?.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      innerHeight > windowHeight ? setResize(true) : setResize(false);
    };

    const observer = new ResizeObserver(() => {
      resize();
    });

    const ref = inner?.current;

    window.addEventListener("resize", () => {
      resize();
    });
    ref && observer?.observe(ref);

    return () => {
      window.removeEventListener("resize", resize);
      ref && observer.disconnect(ref);
    };
  }, []);

  return [resize, form, inner];
};
