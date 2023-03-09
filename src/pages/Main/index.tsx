import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardsContainer, Header, Pagination } from "../../components";
import { useDebounce } from "../../helpers";
import { RootState } from "../../redux";
import { AppDispatch } from "../../types";
import { fetchData } from "../../redux/Repositories/action";
import "./styles.scss";

const selectRepositories = (state: RootState) => state;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector(selectRepositories);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, repositoryCount } = state.repositories;

  const handleSearch = useCallback(
    (e: React.FormEvent<EventTarget>) => {
      setSearch((e.target as HTMLInputElement).value);
    },
    [setSearch]
  );

  useEffect(() => {
    dispatch(fetchData(debouncedSearch, currentPage));
  }, [debouncedSearch, dispatch, currentPage]);

  return (
    <div className="main-container">
      <Header handleSearch={handleSearch} totalCount={repositoryCount} />
      <CardsContainer repositories={data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPosts={repositoryCount}
        maxSize={5}
      />
    </div>
  );
};

export default Main;
