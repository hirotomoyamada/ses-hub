import * as Algolia from "./algolia";
import * as Firestore from "./firestore";

export type Company = Partial<Omit<Algolia.Company, "objectID">> &
  Omit<Partial<Firestore.Company>, "profile"> & {
    parent?: Company;
  };

export type Person = Partial<Omit<Algolia.Person, "objectID">> &
  Omit<Partial<Firestore.Person>, "profile">;
