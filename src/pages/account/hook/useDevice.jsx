import { useEffect, useState } from "react";

export const useDevice = () => {
  const [device, setDevice] = useState(true);

  useEffect(() => {
    if (
      navigator.userAgent.indexOf("iPhone") > 0 ||
      (navigator.userAgent.indexOf("Android") > 0 &&
        navigator.userAgent.indexOf("Mobile") > 0) ||
      navigator.userAgent.indexOf("iPad") > 0 ||
      navigator.userAgent.indexOf("Android") > 0
    ) {
      setDevice(false);
    }
  }, []);

  return [device];
};
