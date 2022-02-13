import { useEffect } from "react";

export const useScrollController = () => {
  const disableScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("touchmove", disableScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", disableScroll, {
        passive: false,
      });
    };
  }, []);
};
