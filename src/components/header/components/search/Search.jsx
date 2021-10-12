import styles from "./Search.module.scss";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../../../../features/post/functions/fetchPosts";
import * as rootSlice from "../../../../features/root/rootSlice";

import { Command } from "../../../command/Command";

export const Search = ({ index, posts }) => {
  const dispatch = useDispatch();

  const search = useSelector(rootSlice.search);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      value: search.value,
    },
  });

  const value = watch("value");

  const [open, setOpen] = useState(false);
  const [control, setControl] = useState(false);

  useEffect(() => {
    reset({ value: search.value });
  }, [reset, search.value]);

  useEffect(() => {
    value && setControl(true);

    if (!value && control) {
      posts.length &&
        dispatch(
          fetchPosts({
            index: index,
            value: "",
            target: search.target,
            type: search.type,
            fetch: true,
          })
        );
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      dispatch(rootSlice.handleSearch());
      setControl(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control, value]);

  const handleOpen = () => {
    setOpen(!open);
    window.removeEventListener("scroll", handleOpen);
  };

  const handleSortChange = (search) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch(search));
    setOpen(!open);
  };

  const handleSearch = () => {
    if (window.parent.screen.width < 1024) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch({ value: value }));
  };

  const handleReset = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch());
    reset({ value: "" });
  };

  return (
    <form
      className={styles.search}
      onSubmit={handleSubmit(handleSearch)}
      action="#"
      submit="search"
    >
      <button type="submit">
        <SearchIcon
          className={`${styles.search_icon} ${styles.search_icon_search}`}
        />
      </button>

      <input
        type="search"
        className={styles.search_input}
        placeholder="検索"
        {...register("value")}
      />

      <button type="button" onClick={handleReset} className={styles.search_btn}>
        <CloseIcon className={styles.search_icon} />
      </button>

      {index === "matters" && (
        <div className={styles.search_cmd}>
          <button
            type="button"
            onClick={handleOpen}
            className={styles.search_btn}
          >
            <FilterListIcon className={styles.search_icon} />
          </button>
          {open && (
            <Command
              sort
              open={open}
              handleSortChange={handleSortChange}
              handleOpen={handleOpen}
            />
          )}
        </div>
      )}
    </form>
  );
};
