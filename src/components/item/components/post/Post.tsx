import { Header } from "./components/header/Header";
import { Title } from "./components/title/Title";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";

import { Matter, Resource } from "types/post";
import { User } from "types/user";

interface PropType {
  index: "matters" | "resources";
  post: Matter | Resource;
  user: User;
  display?: boolean;
  status?: boolean;
}

export const Post: React.FC<PropType> = ({
  index,
  post,
  user,
  display,
  status,
}) => {
  return (
    <article>
      {index === "matters" ? (
        <>
          <Header post={post} user={user} display={display} status={status} />
          <Title post={post} />
          <Main post={post} />
          <Footer post={post} user={user} />
        </>
      ) : (
        index === "resources" && (
          <>
            <Header post={post} user={user} display={display} status={status} />
            <Title post={post} resources />
            <Main post={post} resources />
            <Footer post={post} user={user} />
          </>
        )
      )}
    </article>
  );
};
