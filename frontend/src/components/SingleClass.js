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
import { useHistory } from "react-router";
import { isAuthenticated } from "../api/user";

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
            let res = result[currIndex][0];
            if (result[currIndex][1]) {
                res = res.trim();
                res = res + " " + result[currIndex][1].trim();
            }
            row.push(res);
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

const eachPeriod = (t) => {
    if (!t) return t;
    t = t.trim().split(" ");
    if (t.length === 1) return t.join(" ");
    return (
        <div style={{ position: "relative" }}>
            <span
                style={{
                    position: "absolute",
                    top: "-20px",
                    left: "15px",
                }}
            >
                {t[0]}
            </span>
            <span
                style={{
                    position: "absolute",
                    textAlign: "center",
                    left: "15px",
                }}
            >
                {t[1]}
            </span>
        </div>
    );
};

const SingleClass = ({ clsName, result }) => {
    const classes = useStyles();
    const rows = formateData(result);
    const history = useHistory();
    const { user } = isAuthenticated();

    const attendanceHandler = (period) => {
        if (!period || period === "break") {
            return;
        }

        const t = period.trim().split(" ");
        if (t[t.length - 1] !== user.name) {
            return;
        }

        history.push("/timetable/attendance");
    };

    return (
        <Container className={classes.root}>
            <Typography
                variant="h3"
                align="center"
                color="primary"
                gutterBottom
            >
                {clsName}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {timings.map((timing, ind) => (
                                <StyledTableCell key={ind} align="center">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {timing.split(" ").map((t, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    color: "#e8ad0c",
                                                }}
                                            >
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
                                        <StyledTableCell
                                            align="center"
                                            key={ind2}
                                            style={{
                                                backgroundColor:
                                                    "rgb(128 128 128 / 14%)",
                                                borderRadius: "25px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                attendanceHandler(period)
                                            }
                                        >
                                            {eachPeriod(period)}
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
