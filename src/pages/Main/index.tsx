import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardsContainer, Header, Pagination } from "../../components";
import { useDebounce } from "../../helpers";
import { RootState } from "../../redux";
import { AppDispatch } from "../../types";
import { fetchData } from "../../redux/Repositories/action";
import "./styles.scss";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const [search] = useSearchParams();
  const repositories = useSelector((state: RootState) => state.repositories);
  const [searchValue, setSearchValue] = useState(search.get("search") || "");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data, repositoryCount, pageInfo } = repositories;
  const { endCursor, startCursor } = pageInfo;
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent<EventTarget>) => {
      setSearchValue((e.target as HTMLInputElement).value);
    },
    [searchValue]
  );

  const setPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      dispatch(
        fetchData(
          debouncedSearch,
          page === 1 ? '' : startCursor,
          page === 1 ? '' : endCursor
        )
      );
      setCurrentPage(page);
    },
    [dispatch, debouncedSearch, endCursor, startCursor]
  );

  useEffect(() => {
    navigate(`?search=${debouncedSearch}`);
    dispatch(fetchData(debouncedSearch, "", ""));
  }, [dispatch, debouncedSearch]);

  useEffect(() => {
    const value = search.get("search") || "";
    setSearchValue(value);
  }, [search, setSearchValue]);

  return (
    <div className="main-container">
      <Header
        handleSearch={handleSearch}
        searchValue={searchValue}
        totalCount={repositoryCount}
      />
      <CardsContainer repositories={data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setPage}
        totalPosts={Math.ceil(repositoryCount / 10)}
        maxSize={5}
      />
    </div>
  );
};

export default Main;
