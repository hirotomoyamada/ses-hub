import { Home } from "./Home";
import { Search } from "./Search";
import { Likes } from "./Likes";
import { Outputs } from "./Outputs";
import { Entries } from "./Entries";
import { Posts } from "./Posts";

export const Main = ({ page }) => {
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
  }
};
