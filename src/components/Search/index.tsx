import React, { memo } from "react";
import SearchIcon from '../../images/search.svg';
import "./styles.scss";

interface IProps {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

const Search = ({ handleSearch, value }: IProps) => (
   <div className="search">
    <input type="text" onChange={handleSearch} value={value} />
    <img src={SearchIcon} alt="search icon" />
   </div>
);

export default memo(Search);
