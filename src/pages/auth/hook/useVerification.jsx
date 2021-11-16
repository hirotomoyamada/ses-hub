import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../../firebase";

export const useVerification = (verified) => {
  const location = useLocation();

  const [sign, setSign] = useState(false);
  const [profile, setProfile] = useState(false);
  const [email, setEmail] = useState(false);
  const [create, setCreate] = useState(false);
  const [account, setAccount] = useState(false);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    setSign(location.pathname === "/signup" ? true : false);

    setCreate(
      verified.email || verified.profile || verified.status === "hold"
        ? true
        : false
    );

    setEmail(verified.email);

    setProfile(verified.profile);

    if (uid) {
      db.collection("companys")
        .doc(uid)
        .get()
        .then((doc) => {
          setAccount(doc?.exists && doc?.data().status === "enable");
        })
        .catch((e) => {});
    }
  }, [location.pathname, uid, verified]);

  return [
    sign,
    setSign,
    profile,
    setProfile,
    email,
    setEmail,
    create,
    setCreate,
    account,
  ];
};
