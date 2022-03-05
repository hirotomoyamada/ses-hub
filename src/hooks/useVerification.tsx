import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, db, converter } from "libs/firebase";
import { doc, getDoc } from "firebase/firestore";

import { State as Root } from "features/root/initialState";

import { Company } from "types/post";

export const useVerification = (
  verified: Root["verified"]
): [
  sign: boolean,
  setSign: React.Dispatch<React.SetStateAction<boolean>>,
  profile: boolean,
  setProfile: React.Dispatch<React.SetStateAction<boolean>>,
  email: boolean,
  setEmail: React.Dispatch<React.SetStateAction<boolean>>,
  create: boolean,
  setCreate: React.Dispatch<React.SetStateAction<boolean>>,
  account: boolean
] => {
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
      const ref = doc(db, "companys", uid).withConverter(converter<Company>());
      void getDoc(ref).then((doc) => {
        setAccount(doc.data()?.status === "enable");
      });
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
