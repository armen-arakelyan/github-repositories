import React, { memo, useMemo } from "react";

import "./styles.scss";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  maxSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  maxSize
}) => {
  const pages = useMemo(() => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    return Array.from({ length: maxSize || totalPages }, (_, i) => i + 1);
  }, [totalPosts, postsPerPage, maxSize]);

  if (totalPosts === 0) {
    return null;
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default memo(Pagination);
