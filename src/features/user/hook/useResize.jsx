import { useEffect, useState, useRef } from "react";

export const useResize = () => {
  const main = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const resize = () => {
      window.innerWidth < 1440 && setOpen(false);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return [main, open, setOpen];
};
