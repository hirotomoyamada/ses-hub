import { useForm as useReactHookForm } from "react-hook-form";

export const useForm = () => {
  const methods = useReactHookForm();

  const company = methods.watch("company");
  const person = methods.watch("person");
  const position = methods.watch("position");
  const email = methods.watch("email");
  const body = methods.watch("body");

  return [methods, company, person, position, email, body];
};
