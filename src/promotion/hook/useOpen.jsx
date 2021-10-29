import { useState } from "react";

export const useOpen = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    document.body.classList.add("lock");
  };

  const handleClose = () => {
    setOpen(!open);
    document.body.classList.remove("lock");
  };

  return [open, handleOpen, handleClose];
};
