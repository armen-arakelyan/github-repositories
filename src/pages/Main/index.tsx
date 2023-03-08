import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardsContainer, Header, Pagination } from "../../components";
import { useDebounce } from "../../helpers";
import { RootState } from "../../redux";
import { fetchData } from "../../redux/Repositories/action";
import "./styles.scss";

const selectRepositories = (state: RootState) => state;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector(selectRepositories);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = useCallback(
    (e: React.FormEvent<EventTarget>) => {
      setSearch((e.target as HTMLInputElement).value);
    },
    [setSearch]
  );

  const totalCount = useMemo(
    // @ts-ignore
    () => state.repositories.data?.total_count || state.repositories.data?.length || 0,
    // @ts-ignore
    [state.repositories.data]
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchData(debouncedSearch, currentPage));
  }, [debouncedSearch, dispatch, currentPage]);

  return (
    <div className="main-container">
      <Header handleSearch={handleSearch} totalCount={totalCount} />
      <CardsContainer
        // @ts-ignore
        repositories={state.repositories.data?.items ? state.repositories.data?.items : state.repositories.data}
      />
      <Pagination
        currentPage={currentPage}
        postsPerPage={10}
        setCurrentPage={setCurrentPage}
        totalPosts={totalCount}
        maxSize={10}
      />
    </div>
  );
};

export default Main;
