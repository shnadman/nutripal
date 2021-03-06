import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMacros } from "../../features/macros";

export default function PaginationControlled({ count }) {
  const { params } = useSelector((state) => state.macros.searchResults);

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    const newParams = { ...params, page: value, totalPages: count };
    dispatch(searchMacros(newParams));
    setPage(value);
  };

  return (
    <div>
      <Pagination
        color="secondary"
        count={count}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
