import { useForm as useReactHookForm, UseFormReturn } from "react-hook-form";

export type Data = {
  company: string;
  person: string;
  position: string;
  email: string;
  body: string;
};

export const useForm = (): [
  methods: UseFormReturn<Data>,
  company: string,
  person: string,
  position: string,
  email: string,
  body: string
] => {
  const methods = useReactHookForm<Data>();

  const company = methods.watch("company");
  const person = methods.watch("person");
  const position = methods.watch("position");
  const email = methods.watch("email");
  const body = methods.watch("body");

  return [methods, company, person, position, email, body];
};
