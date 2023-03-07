import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import Icon from 'components/atoms/Icon';

export interface PaginationProps {
  totalPage: number;
  pageCurrent?: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
  handleChangePage?: (val: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  marginPagesDisplayed = 1,
  pageRangeDisplayed = 2,
  pageCurrent,
  handleChangePage,
}) => {
  const [pageActive, setPageActive] = useState(0);

  const handlePageClick = (currentPage: { selected: number }) => {
    const { selected } = currentPage;
    if (handleChangePage) handleChangePage(selected + 1);
    setPageActive(selected);
  };

  useEffect(() => {
    setPageActive(pageCurrent ? pageCurrent - 1 : 0);
  }, [pageCurrent]);

  return totalPage > 1 ? (
    <div className="o-pagination">
      <ReactPaginate
        previousLabel={(
          <Icon
            iconName="arrowBlackPrev"
            size="16"
          />
            )}
        nextLabel={(
          <Icon
            iconName="arrowBlackNext"
            size="16"
          />
        )}
        pageCount={totalPage}
        forcePage={pageActive}
        onPageChange={handlePageClick}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        containerClassName="main"
        breakClassName="page break"
        pageClassName="page"
        activeClassName="active-page"
        pageLinkClassName="link-page"
        breakLinkClassName="link-page link-break"
        nextLinkClassName={`arrow-icon arrow-icon-next ${(pageActive + 1) === totalPage && 'arrow-icon-disabled'}`}
        previousLinkClassName={`arrow-icon arrow-icon-prev ${(pageActive + 1) === 1 && 'arrow-icon-disabled'}`}
      />
    </div>
  ) : (
    <div />
  );
};

export default Pagination;
