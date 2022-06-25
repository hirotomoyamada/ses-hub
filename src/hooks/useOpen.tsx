import { useState } from "react";

export const useOpen = (): [
  open: boolean,
  handleOpen: () => void,
  handleClose: () => void
] => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(!open);
    document.body.classList.add("lock");
  };

  const handleClose = (): void => {
    setOpen(!open);
    document.body.classList.remove("lock");
  };

  return [open, handleOpen, handleClose];
};
