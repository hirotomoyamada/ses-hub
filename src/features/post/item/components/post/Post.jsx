import { Header } from "./components/header/Header";
import { Title } from "./components/title/Title";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";

export const Post = ({ index, post, user, display, status }) => {
  return index === "matters" ? (
    <div>
      <Header post={post} user={user} display={display} status={status} />

      <Title post={post} />

      <Main post={post} />

      <Footer post={post} user={user} />
    </div>
  ) : (
    index === "resources" && (
      <div>
        <Header post={post} user={user} display={display} status={status} />

        <Title post={post} resources />

        <Main post={post} resources />

        <Footer post={post} user={user} />
      </div>
    )
  );
};
