import React, { memo, useMemo } from "react";

import "./styles.scss";

interface PaginationProps {
  totalPosts: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  maxSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  setCurrentPage,
  currentPage,
  maxSize = totalPosts,
}) => {
  const pages = useMemo(() => {
    let startPage = Math.max(1, currentPage - Math.floor(maxSize / 2));
    const endPage = Math.min(totalPosts, startPage + maxSize - 1);

    if (endPage - startPage < maxSize - 1) {
      startPage = Math.max(1, endPage - maxSize + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [totalPosts, currentPage, maxSize]);

  if (totalPosts <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default memo(Pagination);
