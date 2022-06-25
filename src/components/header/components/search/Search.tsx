import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as rootSlice from "features/root/rootSlice";

import { Operation } from "components/operation/Operation";

interface PropType {
  index?: "matters" | "resources" | "companys" | "persons";
}

interface Data {
  value: string;
}

export const Search: React.FC<PropType> = ({ index }) => {
  const dispatch = useDispatch();

  const search = useSelector(rootSlice.search);

  const { register, handleSubmit, reset, watch } = useForm<Data>({
    defaultValues: {
      value: search.value ? search.value : "",
    },
  });

  const value = watch("value");

  const [control, setControl] = useState(false);

  useEffect(() => {
    reset({ value: search.value ? search.value : "" });
  }, [reset, search.value]);

  useEffect(() => {
    value && setControl(true);

    if (!value && control) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      dispatch(rootSlice.handleSearch());
      setControl(false);
    }
  }, [control, value]);

  const handleSearch: SubmitHandler<Data> = (data): void => {
    if (window.parent.screen.width < 1024) {
      (document.activeElement as HTMLElement)?.blur();
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch({ value: data.value }));
  };

  const handleReset = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(rootSlice.handleSearch());
    reset({ value: "" });
  };

  return (
    <form
      className={styles.search}
      onSubmit={handleSubmit(handleSearch)}
      action="#"
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

      {index === "matters" && <Operation sort />}
    </form>
  );
};
