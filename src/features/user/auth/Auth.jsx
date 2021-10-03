import styles from "./Auth.module.scss";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { auth } from "../../../firebase";

import * as functions from "./functions/functions";
import * as userSlice from "../userSlice";

import { Sign } from "./components/Sign";
import { Reset } from "./components/Reset";
import { Create } from "./components/create/Create";
import { Verified } from "./components/Verified";
import { Help, StartGuide } from "./components/help/Help";
import { Terms } from "../../../promotion/pages/terms/Terms";

export const Auth = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const verified = useSelector(userSlice.verified);

  const [sign, setSign] = useState(false);
  const [reset, setReset] = useState(false);

  const [profile, setProfile] = useState(false);
  const [email, setEmail] = useState(false);
  const [help, setHelp] = useState(false);
  const [terms, setTerms] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    functions.getRedirect({ dispatch, email, verified });
  }, [dispatch, email, verified]);

  useEffect(() => {
    setSign(location.pathname === "/signup" ? true : false);

    setCreate(
      verified.email || verified.profile || verified.status === "hold"
        ? true
        : false
    );
    setEmail(verified.email);
    setProfile(verified.profile);
  }, [location.pathname, verified]);

  const methods = useForm();

  const handleSignIn = (data) => {
    functions.handleSignIn({ dispatch, methods, data });
  };

  const handleSignUp = (data) => {
    functions.handleSignUp({ dispatch, methods, setCreate, setEmail, data });
  };

  const handleProvider = (provider) => {
    functions.handleProvider(provider);
  };

  const handleLogout = async () => {
    await auth.signOut().then(() => {
      setProfile(false);
      setReset(false);
      setEmail(false);
      methods.reset();
    });
  };

  const handleReset = (data) => {
    functions.handleReset({ dispatch, reset, setReset, data });
  };

  const handleResend = () => {
    functions.handleResend({ dispatch });
  };

  const handleCreate = (data) => {
    functions.handleCreate({ dispatch, data });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`${styles.auth} ${terms && styles.auth_terms} ${
          (email ||
            verified.status === "hold" ||
            verified.status === "disable") &&
          styles.auth_verified
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
            handleLogout={handleLogout}
            handleResend={handleResend}
            email={email}
            verified={verified}
          />
        ) : profile ? (
          <Create handleLogout={handleLogout} setTerms={setTerms} />
        ) : reset ? (
          <Reset reset={reset} setReset={setReset} />
        ) : (
          <Sign
            sign={sign}
            reset={reset}
            setSign={setSign}
            setReset={setReset}
            handleProvider={handleProvider}
          />
        )}
        {((sign && !create) || verified.email || verified.status === "hold") &&
          verified.status !== "disable" && (
            <StartGuide help={help} setHelp={setHelp} />
          )}
      </form>

      <Help
        help={help}
        email={email}
        create={create}
        profile={profile}
        verified={verified}
        setHelp={setHelp}
      />
    </FormProvider>
  );
};
