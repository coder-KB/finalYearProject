import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  table: {
    minWidth: 700,
  },
  tableHeadCell: {
    display: "flex",
    flexDirection: "column",
  },
});

function formateData(result) {
  const allRows = [];
  for (let day = 0; day < 6; day++) {
    const row = [];
    for (let period = 0; period < 9; ++period) {
      let currIndex = day * 9 + period;
      row.push(result[currIndex][0]);
    }
    row.splice(6, 0, "break");
    row.splice(3, 0, "break");

    allRows.push(row);
  }

  return allRows;
}

const timings = [
  "7:30 to 8:30",
  "8:30 to 9:30",
  "9:30 to 10:30",
  "10:30 to 11:00",
  "11:00 to 11:50",
  "11:50 to 12:40",
  "12:40 to 1:30",
  "1:30 to 2:30",
  "2:30 to 3:30",
  "3:30 to 4:30",
  "4:30 to 5:30",
];

const SingleClass = ({
  clsName = "CS 3rd Sem A",
  result = [
    ["CS46L", null],
    ["CS46L", null],
    ["CS46L", null],
    ["CS420", "Prof. Varsha V"],
    ["CS430", "Prof. H D Nandeesh"],
    ["CS410", "Prof. Vani Ashok"],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
    ["CS440", "Prof. S Brunda"],
    ["MA410", "Prof. Sujatha Raju"],
    ["CS47L", null],
    ["CS47L", null],
    ["CS47L", null],
    ["CS410", "Prof. Vani Ashok"],
    ["CS450", "Prof. Sheela N"],
    [" ", null],
    [" ", null],
    ["CS420", "Prof. Varsha V"],
    ["CS410", "Prof. Vani Ashok"],
    ["HU410", "Prof. Lakshith"],
    ["MA410", "Prof. Sujatha Raju"],
    ["CS440", "Prof. S Brunda"],
    [" ", null],
    [" ", null],
    [" ", null],
    ["CS440", "Prof. S Brunda"],
    ["HU410", "Prof. Lakshith"],
    ["CS420", "Prof. Varsha V"],
    ["CS430", "Prof. H D Nandeesh"],
    ["CS450", "Prof. Sheela N"],
    ["MA410", "Prof. Sujatha Raju"],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
    ["CS450", "Prof. Sheela N"],
    ["CS440", "Prof. S Brunda"],
    ["CS410", "Prof. Vani Ashok"],
    ["CS420", "Prof. Varsha V"],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
    ["CS450", "Prof. Sheela N"],
    ["MA410", "Prof. Sujatha Raju"],
    ["CS430", "Prof. H D Nandeesh"],
    [" ", null],
    [" ", null],
    [" ", null],
    [" ", null],
  ],
}) => {
  const classes = useStyles();
  const rows = formateData(result);

  return (
    <Container className={classes.root}>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        {clsName}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {timings.map((timing, ind) => (
                <StyledTableCell key={ind} align="center">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {timing.split(" ").map((t, i) => (
                      <span key={i} style={{ color: "#e8ad0c" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, ind1) => (
                <StyledTableRow key={ind1}>
                  {row.map((period, ind2) => (
                    <StyledTableCell align="center" key={ind2}>
                      {period}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SingleClass;
