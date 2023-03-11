import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardsContainer, Header, Pagination } from "../../components";
import { useDebounce } from "../../helpers";
import { RootState } from "../../redux";
import { AppDispatch } from "../../types";
import { fetchData } from "../../redux/Repositories/action";
import "./styles.scss";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const repositories = useSelector((state: RootState) => state.repositories);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, repositoryCount, edges } = repositories;

  const handleSearch = useCallback(
    (e: React.FormEvent<EventTarget>) => {
      setSearch((e.target as HTMLInputElement).value);
    },
    [setSearch]
  );

  const setPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      dispatch(fetchData(debouncedSearch, edges[edges.length - 1].cursor || repositories.endCursor));
    },
    [dispatch, debouncedSearch, edges, repositories.endCursor]
  );

  useEffect(() => {
    dispatch(fetchData(debouncedSearch, ""));
  }, [dispatch, debouncedSearch]);

  return (
    <div className="main-container">
      <Header handleSearch={handleSearch} totalCount={repositoryCount} />
      <CardsContainer repositories={data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setPage}
        totalPosts={repositoryCount}
        maxSize={5}
      />
    </div>
  );
};

export default Main;
