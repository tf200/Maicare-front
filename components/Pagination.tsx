import React, { FunctionComponent } from "react";

const DEFAULT_ADJACENT_PAGES_SHOWN = 1;

type Props = {
  page: number;
  totalPages: number;
  adjacentPagesShown?: number;
  onClick: (page: number) => void;
  disabled?: boolean;
};

const usePagination = (props: Props) => {
  const {
    page,
    totalPages,
    adjacentPagesShown = DEFAULT_ADJACENT_PAGES_SHOWN,
  } = props;
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isShowFirstEllipsis = page > 3;
  const isShowLastEllipsis = page < totalPages - 2;
  const isShowFirstPage = page > 1 + adjacentPagesShown;
  const isShowLastPage = page < totalPages - adjacentPagesShown;

  return {
    isFirstPage,
    isLastPage,
    pages,
    isShowFirstEllipsis,
    isShowLastEllipsis,
    isShowFirstPage,
    isShowLastPage,
  };
};

const Pagination: FunctionComponent<Props> = (props) => {
  const { adjacentPagesShown = DEFAULT_ADJACENT_PAGES_SHOWN } = props;
  const {
    isFirstPage,
    isLastPage,
    pages,
    isShowFirstEllipsis,
    isShowLastEllipsis,
    isShowFirstPage,
    isShowLastPage,
  } = usePagination(props);
  const onClick = props.disabled ? () => {} : props.onClick;
  return (
    <div className="p-4 sm:p-6 xl:p-7.5">
      <nav>
        <ul className="flex flex-wrap items-center gap-2">
          {isFirstPage ? (
            <li className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black">
              Previous
            </li>
          ) : (
            <li>
              <a
                onClick={() => onClick(props.page - 1)}
                href="#"
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black hover:bg-primary hover:text-white"
              >
                Previous
              </a>
            </li>
          )}
          {isShowFirstPage && (
            <li>
              <a
                onClick={() => onClick(1)}
                href="#"
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black hover:bg-primary hover:text-white"
              >
                1
              </a>
            </li>
          )}
          {isShowFirstEllipsis && (
            <li>
              <a className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black">
                ...
              </a>
            </li>
          )}
          {pages.map((page) => {
            if (
              Math.abs(page - props.page) <= adjacentPagesShown ||
              page === props.page
            ) {
              return (
                <li key={page}>
                  <a
                    onClick={() => onClick(page)}
                    href="#"
                    className={`inline-flex items-center px-3 py-1.5 rounded-md ${
                      page === props.page
                        ? "bg-primary text-white"
                        : "bg-[#EDEFF1] text-black hover:bg-primary hover:text-white"
                    } text-xs font-medium`}
                  >
                    {page}
                  </a>
                </li>
              );
            }
            return null;
          })}
          {isShowLastEllipsis && (
            <li>
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black">
                ...
              </span>
            </li>
          )}
          {isShowLastPage && (
            <li>
              <a
                onClick={() => onClick(pages.length)}
                href="#"
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black hover:bg-primary hover:text-white"
              >
                {pages.length}
              </a>
            </li>
          )}
          {isLastPage ? (
            <li className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black">
              Next
            </li>
          ) : (
            <li>
              <a
                href="#"
                onClick={() => onClick(props.page + 1)}
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#EDEFF1] text-xs font-medium text-black hover:bg-primary hover:text-white"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
