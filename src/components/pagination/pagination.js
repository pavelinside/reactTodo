import React from "react";
import PropTypes from "prop-types";
import "./pagination.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

const Pagination = ({ totalRecords = null, pageNumber = 1, pageLimit = 30, pageNeighbours = 0, onPageChanged }) => {
  pageNumber = typeof pageNumber === "number" ? pageNumber : 1;
  pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
  pageNeighbours = typeof pageNeighbours === "number" ? Math.max(0, Math.min(pageNeighbours, 2)) : 0;

  const pagesTotal = Math.ceil(totalRecords / pageLimit);
  //console.log("PAG", totalRecords, pageLimit, pageNeighbours, pagesTotal);

  const gotoPage = page => {
    const pageNumber = Math.max(0, Math.min(page, pagesTotal));
    const paginationData = {
      pageNumber,
      pagesTotal: pagesTotal,
      pageLimit: pageLimit,
      totalRecords: totalRecords
    };
    onPageChanged(paginationData);
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(pageNumber - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(pageNumber + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (pagesTotal > totalBlocks) {
      const leftBound = pageNumber - pageNeighbours;
      const rightBound = pageNumber + pageNeighbours;
      const beforeLastPage = pagesTotal - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      let pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, pagesTotal];
    }

    return range(1, pagesTotal);
  };

  if (!totalRecords) return null;

  if (pagesTotal === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <div className="d-flex flex-row py-4 align-items-center">
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            );

          return (
            <li key={index} className={`page-item${ pageNumber === page ? " active" : "" }`}>
              <a className="page-link" href="#" onClick={e => handleClick(page, e)} >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;