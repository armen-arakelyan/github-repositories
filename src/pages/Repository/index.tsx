import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../redux";
import { fetchData } from "../../redux/Repository/action";
import { AppDispatch } from "../../types";
import { NotFound } from '../../components';
import "./styles.scss";

const Repository = () => {
  const { owner = "", name = "" } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data: repository, loading } = useSelector((state: RootState) => state.repository);

  useEffect(() => {
    dispatch(fetchData(name, owner));
  }, [dispatch, owner, name]);

  return (
    <>
      {loading ? null : repository.name ? (
        <div className="repository-card">
          <div className="repository-card--content">
          <h1>{repository.name}</h1>
          <div className="repository-card--content--profile">
          <img
              src={repository.owner.avatarUrl}
              alt="Pic"
            />
          <p>{repository.owner.login}</p>
          </div>
          <p className="title">Stars: {repository.stargazerCount}</p>
          <p>Last commit date: {new Date(repository.pushedAt as Date).toLocaleString()}</p>
          <p>Languages: {repository.languages.join(', ')}</p>
          <p>Description: {repository.shortDescriptionHTML || 'This repository has no description'}</p>
          </div>
        </div>
      ) : <NotFound />}
    </>
  );
};

export default Repository;
