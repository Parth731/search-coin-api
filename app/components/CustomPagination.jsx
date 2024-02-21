import { useEffect, useState } from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});
const SelectedPageButton = styled("button")({
  color: "#34383F",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  fontWeight: "400",
  border: "none",
  cursor: "pointer",
});
const ArrowButton = styled("button")({
  color: "#34383F",
  border: "none",
  cursor: "pointer",
  background: "none",
  "&:disabled": {
    color: "red", // Change this to your desired red color
  },
});

const CustomPagination = ({
  currentPage,
  totalPageCount,
  onPageChange,
  perPageRecords,
  setPerPageRecords,
  totalRecords,
}) => {
  console.log(totalRecords, currentPage, totalPageCount);
  const { items } = usePagination({
    count: totalPageCount,
    page: currentPage,
    onChange(event, page) {
      onPageChange(page);
    },
  });
  const [recordsFromNo, setRecordsFromNo] = useState(0);
  const [recordsToNo, setRecordsToNo] = useState(0);

  useEffect(() => {
    if (currentPage && perPageRecords && totalRecords) {
      let fromNo = 0;
      let toNo = 0;
      fromNo = Math.round((currentPage - 1) * perPageRecords);
      toNo = Math.round(
        currentPage * perPageRecords <= totalRecords
          ? currentPage * perPageRecords
          : totalRecords
      );
      setRecordsFromNo(fromNo);
      setRecordsToNo(toNo);
    }
  }, [currentPage, perPageRecords, totalRecords]);

  const handlePerPageRecordsChange = (value) => {
    if (setPerPageRecords) {
      onPageChange(1);
      setPerPageRecords(value);
    }
  };

  return (
    <nav className="pagination-bottom user-pagination">
      <div className="display-date-pagination">
        <label className="m-left">Display Data:</label>
        <select
          value={perPageRecords}
          onChange={(e) => handlePerPageRecordsChange(e.target.value)}
          className="pagination-select-value"
          name="data"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
        </select>
      </div>
      <List>
        <li>
          <ArrowButton type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.6775 10.0002L12.8025 14.1252C12.8821 14.202 12.9456 14.294 12.9893 14.3956C13.0329 14.4973 13.0559 14.6067 13.0569 14.7173C13.0578 14.828 13.0368 14.9377 12.9949 15.0401C12.953 15.1425 12.8911 15.2356 12.8128 15.3138C12.7346 15.3921 12.6415 15.4539 12.5391 15.4958C12.4367 15.5377 12.327 15.5588 12.2163 15.5579C12.1057 15.5569 11.9963 15.5339 11.8947 15.4902C11.793 15.4466 11.701 15.3831 11.6242 15.3035L6.91 10.5893C6.75378 10.433 6.66602 10.2211 6.66602 10.0002C6.66602 9.77918 6.75378 9.56726 6.91 9.41098L11.6242 4.69682C11.7813 4.54502 11.9918 4.46102 12.2103 4.46292C12.4288 4.46482 12.6378 4.55246 12.7924 4.70697C12.9469 4.86148 13.0345 5.07049 13.0364 5.28898C13.0383 5.50748 12.9543 5.71798 12.8025 5.87515L8.6775 10.0002Z"
                fill="#87919F"
              />
            </svg>
          </ArrowButton>
        </li>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <SelectedPageButton
                type="button"
                style={{
                  fontWeight: selected ? "400" : undefined,
                  backgroundColor: selected ? "#807AED" : "transparent",
                  color: selected ? "#fff" : "#34383F",
                }}
                {...item}
              >
                {page}
              </SelectedPageButton>
            );
          } else {
            children = (
              <button className="pre-btn" type="button" {...item}>
                {type}
              </button>
            );
          }

          return (
            <li key={index} className="page-circle">
              {children}
            </li>
          );
        })}
        <li>
          <ArrowButton type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0953 10.0587L6.97025 5.93374C6.81846 5.77658 6.73446 5.56607 6.73636 5.34758C6.73826 5.12908 6.8259 4.92007 6.98041 4.76556C7.13491 4.61106 7.34392 4.52341 7.56242 4.52152C7.78092 4.51962 7.99142 4.60361 8.14859 4.75541L12.8628 9.46958C13.019 9.62585 13.1067 9.83777 13.1067 10.0587C13.1067 10.2797 13.019 10.4916 12.8628 10.6479L8.14859 15.3621C7.99142 15.5139 7.78092 15.5979 7.56242 15.596C7.34392 15.5941 7.13491 15.5064 6.98041 15.3519C6.8259 15.1974 6.73826 14.9884 6.73636 14.7699C6.73446 14.5514 6.81846 14.3409 6.97025 14.1837L11.0953 10.0587Z"
                fill="#87919F"
              />
            </svg>
          </ArrowButton>
        </li>
      </List>
      <div className="display-result-pagination">
        <label className="m-left">Result:</label>
        <span>
          {recordsFromNo + 1} - {recordsToNo} of {totalRecords}
        </span>
      </div>
    </nav>
  );
};

export default CustomPagination;
