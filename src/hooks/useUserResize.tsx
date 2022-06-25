import { useEffect, useState, useRef } from "react";

export const useUserResize = (): [
  main: React.RefObject<HTMLDivElement>,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
] => {
  const main = useRef<HTMLDivElement>(null);
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
