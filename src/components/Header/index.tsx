import React, { memo } from "react";
import { Search } from "../../components";
import "./styles.scss";

interface IProps {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
  totalCount: number;
  searchValue: string;
}

const Header = ({ handleSearch, totalCount, searchValue }: IProps) => {
  return (
    <div className="header">
      <h2>Github Repositories ({totalCount})</h2>
      <Search handleSearch={handleSearch} value={searchValue} />
    </div>
  );
};

export default memo(Header);
