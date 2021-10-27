import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useVerification = (verified) => {
  const location = useLocation();

  const [sign, setSign] = useState(false);
  const [profile, setProfile] = useState(false);
  const [email, setEmail] = useState(false);
  const [create, setCreate] = useState(false);

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

  return [
    sign,
    setSign,
    profile,
    setProfile,
    email,
    setEmail,
    create,
    setCreate,
  ];
};
