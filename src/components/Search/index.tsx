import React, { memo } from "react";
import SearchIcon from '../../images/search.svg';
import "./styles.scss";

interface IProps {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Search = ({ handleSearch }: IProps) => (
   <div className="search">
    <input type="text" onChange={handleSearch} />
    <img src={SearchIcon} alt="search icon" />
   </div>
);

export default memo(Search);
