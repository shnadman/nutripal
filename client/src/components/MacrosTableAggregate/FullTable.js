import { useMediaQuery } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import "../tableStyles.css";

import { getComparator, stableSort } from "./SortAndCompareUtils";
import EnhancedTableHead from "./Tablehead";
import EnhancedTableToolbar from "./Toolbar";
import TotalAggregate from "./TotalAggregate";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 30,
    width: "85%",
    fontSize: "0.3rem",
    lineHeight: 1,
  },
  paper: {
    borderRadius: "inherit",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "0.7px solid white",
    marginBottom: theme.spacing(2),
  },
  table: {
    // filter: "blur(8px)",

    // backgroundImage:
    //   "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
    //   "url(https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
    backgroundRepeat: "no-repeat",
    zIndex: "-1",
    backgroundSize: "cover",
    justifyContent: "center",
    backgroundColor: "transparent",
    minWidth: 200,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableRow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme,
    },
  },
}));

export default function EnhancedTable({
  rows,
  dynamicSelecting,
  compositionCreateAction,
  compositionUpdateAction,
}) {
  const {
    handleClick,
    handleSelectAllClick,
    selected,
    isSelected,
    aggTotals,
    totals,
  } = dynamicSelecting;
  const isMobile = useMediaQuery("(max-width:860px)");
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(isMobile);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div id="selected" className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            padding={isMobile ? "none" : "default"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        size="small"
                        padding="none"
                        style={{ fontSize: "1rem", width: "480px" }}
                      >
                        {row.name}
                      </TableCell>
                      {/*<TableCell align="right">{`x1`}</TableCell>*/}
                      <TableCell align="right">
                        {`${row.servingSize} ${row.servingSizeUnit}`}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 40) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TotalAggregate
          className={classes.table}
          selected={selected}
          aggTotals={aggTotals}
          totals={totals}
        />
        <TablePagination
          className={classes.table}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <div id="compositions">
        {compositionCreateAction}
        {compositionUpdateAction}
      </div>
    </div>
  );
}
