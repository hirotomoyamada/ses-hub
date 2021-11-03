import { functions } from "../../../firebase";
import { useState } from "react";

export const useContact = () => {
  const [complete, setComplete] = useState(false);
  const [verification, setVerification] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const onVerification = () => {
    setVerification(!verification);
  };

  const onBack = () => {
    setVerification(!verification);
  };

  const onSubmit = (data) => {
    setLoad(true);
    const contactPromotion = functions.httpsCallable("sh-contactPromotion");

    contactPromotion(data)
      .then(() => {
        setLoad(false);
        setComplete(true);
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
        setVerification(false);

        setTimeout(() => setError(false), 4000);
      });
  };

  return [
    complete,
    verification,
    load,
    error,
    onVerification,
    onBack,
    onSubmit,
  ];
};
