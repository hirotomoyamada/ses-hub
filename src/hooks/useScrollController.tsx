import { useEffect } from "react";

export const useScrollController = (): void => {
  const disableScroll = (e: TouchEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);
};
