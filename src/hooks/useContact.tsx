import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { functions } from "libs/firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";

import { Data } from "./useForm";

export const useContact = (): [
  complete: boolean,
  verification: boolean,
  load: boolean,
  error: boolean,
  onVerification: SubmitHandler<Data>,
  onBack: () => void,
  onSubmit: SubmitHandler<Data>
] => {
  const [complete, setComplete] = useState(false);
  const [verification, setVerification] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const onVerification: SubmitHandler<Data> = (): void => {
    setVerification(!verification);
  };

  const onBack = (): void => {
    setVerification(!verification);
  };

  const onSubmit: SubmitHandler<Data> = async (data): Promise<void> => {
    setLoad(true);

    const contactPromotion: HttpsCallable<Data, unknown> = httpsCallable(
      functions,
      "sh-contactPromotion"
    );

    await contactPromotion(data)
      .then((): void => {
        setLoad(false);
        setComplete(true);
      })
      .catch((): void => {
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
