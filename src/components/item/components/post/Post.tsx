import root from "../../Item.module.scss";

import { Link } from "react-router-dom";

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
  outputs?: Matter[] | Resource[];
}

export const Post: React.FC<PropType> = ({
  index,
  post,
  user,
  display,
  status,
  outputs,
}) => {
  return (
    <Link
      to={`/${index}/${post.objectID}`}
      target="_blank"
      className={`
        ${root.item_btn} 
        ${outputs?.length && root.item_btn_disable}
      `}
    >
      <article
        className={`
          ${root.item} 
          ${outputs?.length && root.item_none} 
          ${outputs
            ?.map(
              (output) => output.objectID === post.objectID && root.item_outputs
            )
            .join(" ")}
        `}
      >
        {index === "matters" ? (
          <div>
            <Header post={post} user={user} display={display} status={status} />
            <Title post={post} />
            <Main post={post} />
            <Footer post={post} user={user} />
          </div>
        ) : (
          index === "resources" && (
            <div>
              <Header
                post={post}
                user={user}
                display={display}
                status={status}
              />
              <Title post={post} resources />
              <Main post={post} resources />
              <Footer post={post} user={user} />
            </div>
          )
        )}
      </article>
    </Link>
  );
};
