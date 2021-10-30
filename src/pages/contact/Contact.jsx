import styles from "./Contact.module.scss";

import Loader from "react-loader-spinner";

import { functions } from "../../firebase";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Form } from "./components/form/Form";
import { Verification } from "./components/Verification";
import { Complete } from "./components/Complete";

export const Contact = () => {
  const [complete, setComplete] = useState(false);
  const [verification, setVerification] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const methods = useForm();

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

  const company = methods.watch("company");
  const person = methods.watch("person");
  const position = methods.watch("position");
  const email = methods.watch("email");
  const body = methods.watch("body");

  return (
    <div className={styles.contact}>
      <div className={styles.contact_inner}>
        <h1 className={styles.contact_ttl}>
          {complete
            ? "送信完了"
            : verification
            ? "お問い合わせ内容"
            : "お問い合わせ"}
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              verification ? onSubmit : onVerification
            )}
            className={styles.contact_form}
          >
            {complete ? (
              <Complete />
            ) : verification ? (
              <Verification
                company={company}
                person={person}
                position={position}
                email={email}
                body={body}
                onBack={onBack}
              />
            ) : (
              <Form person={person} email={email} body={body} />
            )}
          </form>
          {error && (
            <span
              className={`${styles.contact_form_error} ${styles.contact_form_error_submit}`}
            >
              送信に失敗しました。再度行ってください。
            </span>
          )}
        </FormProvider>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/img/promotion/contact.svg`}
        alt=""
        className={`${styles.contact_bg} ${
          complete && styles.contact_bg_complete
        }`}
      />
      {load && (
        <div className={styles.contact_load}>
          <Loader type="Oval" color="#ff9900" height={56} width={56} />
        </div>
      )}
    </div>
  );
};
