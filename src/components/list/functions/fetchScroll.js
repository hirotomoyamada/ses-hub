import { fetchPosts } from "../../../features/post/actions/fetchPosts";
import { homePosts } from "../../../features/post/actions/homePosts";
import { userPosts } from "../../../features/post/actions/userPosts";
import { extractPosts } from "../../../features/post/actions/extractPosts";

export const fetchScroll = async (
  dispatch,
  index,
  user,
  home,
  search,
  side,
  sort,
  type,
  select,
  page
) => {
  await dispatch(
    search
      ? fetchPosts({
          index: index,
          value: search.value,
          target: search.target,
          type: search.type,
          page: page,
        })
      : home
      ? homePosts({
          index: index,
          follows: [user.uid, ...user.home],
          page: page,
        })
      : side || select
      ? userPosts({
          index: !select ? index : "companys",
          uid: user?.uid,
          uids: (index === "companys" || select) && user?.follows,
          status: !select && sort.status,
          display: !select && sort.display,
          page: page,
        })
      : type &&
        extractPosts({
          index: index,
          objectIDs: user[type][index],
          type: type,
          page: page,
        })
  );
};
