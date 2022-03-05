import React from "react";
import styles from "./Contact.module.scss";

import Loader from "react-loader-spinner";

import { useForm } from "hooks/useForm";
import { useContact } from "hooks/useContact";
import { FormProvider } from "react-hook-form";

import { Form } from "./components/form/Form";
import { Verification } from "./components/Verification";
import { Complete } from "./components/Complete";

export const Contact: React.FC = () => {
  const [methods, company, person, position, email, body] = useForm();
  const [
    complete,
    verification,
    load,
    error,
    onVerification,
    onBack,
    onSubmit,
  ] = useContact();

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
