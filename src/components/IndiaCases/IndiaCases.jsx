import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import { TableRow, Grid, Button, Typography } from "@material-ui/core";

import styles from "./IndiaCases.module.css";

const columns = [
  {
    id: "State",
    label: "State",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Confirmed",
    label: "Confirmed",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Active",
    label: "Active",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Recovered",
    label: "Recovered",
    minWidth: 120,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Deaths",
    label: "Deaths",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function IndiaCases({ statewise, setShowTable }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);
  let rows = statewise;
  console.log("statewise", statewise);

  useEffect(() => {
    rows = statewise;
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rowStyleColor = (i) => {
    const color = {
      color: null,
    };
    if (i == 1) {
      color.color = "blue";
    } else if (i == 2) {
      color.color = "orange";
    } else if (i == 3) {
      color.color = "green";
    } else if (i == 4) {
      color.color = "red";
    } else {
      color.color = null;
    }
    return color;
  };

  if (!statewise) return "Loading";

  return (
    <Grid item xs={12} md={12} xs={12}>
      <Typography className={styles.tableHeading}>
        {`State-wise Details of COVID-19 Cases as on :`}
        <strong> {`${rows[rows.length - 1].date.toLocaleString()}`}</strong>
      </Typography>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ maxWidth: "auto", margin: "3% 5%" }}>
                {columns.map((column, i) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    style={rowStyleColor(i)}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { state, confirmed, active, recovered, deaths } = row;
                  console.log("style :::", state);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={state}
                      style={{ maxWidth: "auto", margin: "3% 5%" }}
                      style={
                        state === "Total"
                          ? {
                              backgroundColor: "rgba(0,128,128,0.3)",
                              textDecoration: "underline",
                            }
                          : {}
                      }
                    >
                      <TableCell component="th" scope="row">
                        {state}
                      </TableCell>
                      <TableCell align="left" style={{ color: "blue" }}>
                        {confirmed}
                      </TableCell>
                      <TableCell align="left" style={{ color: "orange" }}>
                        {active}
                      </TableCell>
                      <TableCell align="left" style={{ color: "green" }}>
                        {recovered}
                      </TableCell>
                      <TableCell align="left" style={{ color: "red" }}>
                        {deaths}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[40, 80, 120]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Button
        className={styles.buttonBack}
        onClick={() => setShowTable(false)}
      >{`<<Back`}</Button>
    </Grid>
  );
}
