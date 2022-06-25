import React, { useState, useEffect } from "react";
import styles from "./Auth.module.scss";

import { auth } from "libs/firebase";
import { signOut } from "firebase/auth";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useResize } from "hooks/useResize";
import { useVerification } from "hooks/useVerification";

import * as rootSlice from "features/root/rootSlice";
import * as functions from "functions";

import { Sign } from "./components/Sign";
import { Reset } from "./components/Reset";
import { Create } from "./components/create/Create";
import { Verified } from "./components/Verified";
import { Help, StartGuide } from "./components/help/Help";
import { Terms } from "../terms/Terms";

export type Data = {
  type: "individual" | "parent";
  reset: string;
  email: string;
  password: string;
  verifiedPassword: string;

  name: string;
  person: string;
  position: string;
  postal: string;
  address: string;
  tel: string;
  agree: "enable";
};

export const Auth: React.FC = () => {
  const dispatch = useDispatch();

  const methods = useForm<Data>({ defaultValues: { type: "individual" } });

  const verified = useSelector(rootSlice.verified);

  const [reset, setReset] = useState(false);
  const [help, setHelp] = useState(false);
  const [terms, setTerms] = useState(false);

  const [resize, inner] = useResize(verified);
  const [
    sign,
    setSign,
    profile,
    setProfile,
    email,
    setEmail,
    create,
    setCreate,
    account,
  ] = useVerification(verified);

  useEffect(() => {
    window.scrollTo(0, 0);

    functions.auth.getRedirect({ dispatch });
  }, [dispatch]);

  const handleSignIn: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.auth.handleSignIn({ dispatch, methods, data });
  };

  const handleSignUp: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.auth.handleSignUp({
      dispatch,
      methods,
      setCreate,
      setEmail,
      data,
    });
  };

  const handleProvider = async (
    provider: "google" | "twitter" | "github"
  ): Promise<void> => {
    await functions.auth.handleProvider(provider);
  };

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      setProfile(false);
      setReset(false);
      setEmail(false);
      methods.reset();
    });
  };

  const handleBack = (): void => {
    dispatch(rootSlice.handleVerified());
  };

  const handleReset: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.auth.handleReset({ dispatch, reset, setReset, data });
  };

  const handleResend = async (): Promise<void> => {
    await functions.auth.handleResend({ dispatch });
  };

  const handleCreate: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.auth.handleCreate({ dispatch, data });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`${styles.auth} ${terms && styles.auth_terms} ${
          resize && styles.auth_resize
        }`}
        onSubmit={
          reset
            ? methods.handleSubmit(handleReset)
            : profile
            ? methods.handleSubmit(handleCreate)
            : sign
            ? methods.handleSubmit(handleSignUp)
            : methods.handleSubmit(handleSignIn)
        }
      >
        {terms ? (
          <Terms create setTerms={setTerms} />
        ) : email ||
          verified.status === "hold" ||
          verified.status === "disable" ? (
          <Verified
            inner={inner}
            handleLogout={handleLogout}
            handleBack={handleBack}
            handleResend={handleResend}
            email={email}
            verified={verified}
            resize={resize}
          />
        ) : profile ? (
          <Create
            inner={inner}
            handleLogout={handleLogout}
            setTerms={setTerms}
            resize={resize}
          />
        ) : reset ? (
          <Reset
            inner={inner}
            reset={reset}
            setReset={setReset}
            resize={resize}
          />
        ) : (
          <Sign
            inner={inner}
            sign={sign}
            reset={reset}
            setSign={setSign}
            setReset={setReset}
            handleProvider={handleProvider}
            resize={resize}
          />
        )}
        {!account &&
          ((sign && !create) || verified.email || verified.status === "hold") &&
          verified.status !== "disable" && (
            <StartGuide help={help} setHelp={setHelp} resize={resize} />
          )}
      </form>

      <Help
        help={help}
        setHelp={setHelp}
        email={email}
        create={create}
        profile={profile}
      />
    </FormProvider>
  );
};
