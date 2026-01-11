import "./Pagination.scss";
import {
  ChevronLeft,
  ChevronRight,
  ChevronOutline,
} from "../../../../assets/icons";

interface Props {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage < 4) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= 4 && currentPage < totalPages - 2) {
        pages.push(1, "...", currentPage, "...", totalPages);
      } else {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination__left">
        <span>Showing</span>
        <div className="pagination__select-wrapper">
          <select
            aria-label="Select page size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="pagination__select"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <img
            src={ChevronOutline}
            alt=""
            className="pagination__select-icon"
          />
        </div>
        <span>out of {totalCount}</span>
      </div>

      <div className="pagination__right">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination__nav-btn"
        >
          <img src={ChevronLeft} alt="prev" />
        </button>

        <div className="pagination__numbers">
          {getPages().map((page, index) => (
            <button
              key={index}
              disabled={page === "..."}
              className={`pagination__num ${
                currentPage === page ? "active" : ""
              } ${page === "..." ? "dots" : ""}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination__nav-btn"
        >
          <img src={ChevronRight} alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
