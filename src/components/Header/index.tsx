import React, { memo } from "react";
import { Search } from "../../components";
import "./styles.scss";

interface IProps {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
  totalCount: number;
}

const Header = ({ handleSearch, totalCount }: IProps) => {
  return (
    <div className="header">
      <h2>Github Repositories ({totalCount})</h2>
      <Search handleSearch={handleSearch} />
    </div>
  );
};

export default memo(Header);
