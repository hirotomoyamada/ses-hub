import styles from "./Auth.module.scss";

import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useResize } from "./hook/useResize";
import { useVerification } from "./hook/useVerification";

import * as rootSlice from "../../features/root/rootSlice";
import * as functions from "../../features/user/functions/functions";

import { Sign } from "./components/Sign";
import { Reset } from "./components/Reset";
import { Create } from "./components/create/Create";
import { Verified } from "./components/Verified";
import { Help, StartGuide } from "./components/help/Help";
import { Terms } from "../../pages/terms/Terms";

export const Auth = () => {
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues: { type: "individual" } });
  const verified = useSelector(rootSlice.verified);

  const [reset, setReset] = useState(false);
  const [help, setHelp] = useState(false);
  const [terms, setTerms] = useState(false);

  const [
    sign,
    setSign,
    profile,
    setProfile,
    email,
    setEmail,
    create,
    setCreate,
  ] = useVerification(verified);

  const [resize, form, inner] = useResize();

  useEffect(() => {
    functions.auth.getRedirect({ dispatch });
  }, [dispatch]);

  const handleSignIn = (data) => {
    functions.auth.handleSignIn({ dispatch, methods, data });
  };

  const handleSignUp = (data) => {
    functions.auth.handleSignUp({
      dispatch,
      methods,
      setCreate,
      setEmail,
      data,
    });
  };

  const handleProvider = (provider) => {
    functions.auth.handleProvider(provider);
  };

  const handleLogout = async () => {
    await auth.signOut().then(() => {
      setProfile(false);
      setReset(false);
      setEmail(false);
      methods.reset();
    });
  };

  const handleBack = () => {
    dispatch(rootSlice.handleVerified("reset"));
  };

  const handleReset = (data) => {
    functions.auth.handleReset({ dispatch, reset, setReset, data });
  };

  const handleResend = () => {
    functions.auth.handleResend({ dispatch });
  };

  const handleCreate = (data) => {
    functions.auth.handleCreate({ dispatch, data });
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
        ref={form}
      >
        {terms ? (
          <Terms create setTerms={setTerms} />
        ) : email ||
          verified.status === "hold" ||
          verified.status === "disable" ? (
          <Verified
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
          <Reset reset={reset} setReset={setReset} resize={resize} />
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
        {((sign && !create) || verified.email || verified.status === "hold") &&
          verified.status !== "disable" && (
            <StartGuide help={help} setHelp={setHelp} resize={resize} />
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
