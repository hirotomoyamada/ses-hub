import React from "react";
import { Home } from "./Home";
import { Search } from "./Search";
import { Likes } from "./Likes";
import { Outputs } from "./Outputs";
import { Entries } from "./Entries";
import { Posts } from "./Posts";
import { Requests } from "./Requests";
import { Account } from "./Account";
import { Plan } from "./Plan";

interface PropType {
  page: string;
  type: string;
}

export const Main: React.FC<PropType> = ({ page, type }) => {
  switch (page) {
    default:
      return <Home />;
    case "search":
      return <Search />;
    case "likes":
      return <Likes />;
    case "outputs":
      return <Outputs />;
    case "entries":
      return <Entries />;
    case "posts":
      return <Posts />;
    case "plan":
      return <Plan type={type} />;
    case "requests":
      return <Requests />;
    case "account":
      return <Account type={type} />;
  }
};
