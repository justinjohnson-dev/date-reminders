import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TextField, Button } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import axios from "axios";



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'birthdayName', numeric: true, disablePadding: false, label: 'Name' },
    { id: 'birthdayDate', numeric: true, disablePadding: false, label: 'Birthday' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, isSelected, userName, userPhone, mongoData } = props;

    const uploadToMongo = () => {
        let userInfo = {
            name: userName,
            phone_number: userPhone,
            birthdays: mongoData
        };

        if (mongoData != undefined) {
            axios.post(`/api/v1/userBirthdays`, userInfo)
                .then(res => { })
        } else {
            console.log('No data to be deleted')
        }
    }

    const removeByAttr = function (arr, attr, value) {
        // https://stackoverflow.com/questions/3396088/how-do-i-remove-an-object-from-an-array-with-javascript
        let i = arr.length;
        while (i--) {
            if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }

    const deleteBirthday = () => {
        for (let i = 0; i < isSelected.length; i++) {
            removeByAttr(mongoData, 'id', isSelected[i])
        }

        uploadToMongo();
        window.location.reload(false);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" letiant="subtitle1" component="div">
                    {numSelected} selected
        </Typography>
            ) : (
                    <Typography className={classes.title} letiant="h6" id="tableTitle" component="div">
                        Birthdays
        </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={deleteBirthday} />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [mongoData, setMongoData] = React.useState([]);
    const [userName, setUserName] = React.useState("");
    const [userPhone, setUserPhone] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [birthdayName, setBirthdayName] = React.useState("");
    const [birthdayDate, setBirthdayDate] = React.useState("");
    const [age, setAge] = React.useState(0);
    const rows = mongoData;

    useEffect(() => {
        let userInformation = localStorage.getItem('user');
        let userName = userInformation.substr(0, userInformation.indexOf(',')).trim();
        let userPhone = userInformation.substr(userInformation.indexOf(','), userInformation.length).replace(',', '').trim();
        setUserName(userName);
        setUserPhone(userPhone);
        axios.get(`/api/v1/birthdays/${userPhone}`)
            .then(response => setMongoData(response.data.birthdays));
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    const findAge = (birthdayDate) => {
        // https://stackoverflow.com/questions/12251325/javascript-date-to-calculate-age-work-by-the-day-months-years
        let today = new Date();
        let DOB = new Date(birthdayDate);
        let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
        totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
        let years = today.getFullYear() - DOB.getFullYear();
        if (DOB.getMonth() > today.getMonth())
            years = years - 1;
        else if (DOB.getMonth() === today.getMonth())
            if (DOB.getDate() > today.getDate())
                years = years - 1;

        let days;
        let months;

        if (DOB.getDate() > today.getDate()) {
            months = (totalMonths % 12);
            if (months == 0)
                months = 11;
            let x = today.getMonth();
            switch (x) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    let a = DOB.getDate() - today.getDate();
                    days = 31 - a;
                    break;
                }
                default: {
                    let a = DOB.getDate() - today.getDate();
                    days = 30 - a;
                    break;
                }
            }

        }
        else {
            days = today.getDate() - DOB.getDate();
            if (DOB.getMonth() === today.getMonth())
                months = (totalMonths % 12);
            else
                months = (totalMonths % 12) + 1;
        }
        let age = years + ' years ' + months + ' months ' + days + ' days';
        return age;
    }

    const uploadToMongo = () => {
        let userInfo = {
            name: userName,
            phone_number: userPhone,
            birthdays: mongoData
        };

        console.log('sending data')
        console.log(mongoData)

        if (mongoData != undefined) {
            axios.post(`/api/v1/userBirthdays`, userInfo)
                .then(res => {
                    console.log("userInfo")
                    console.log(userInfo)
                })
        } else {
            console.log('Sending no data - no birthdays were added')
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const formValidation = () => {
        let isValid = true;
        const errors = {};

        if (birthdayName.trim().length < 1) {
            errors.birthdayNameLength = "Name is required!"
            isValid = false;
        }
        if (birthdayDate.trim().length < 1) {
            errors.birthdayDateLength = "Must add a date!"
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const handleAddClick = () => {
        let id = 1;
        let lastBirthdayIndex = null;
        let lastBirthdayId = null;
        // validate birthday
        const isValid = formValidation();

        if (isValid) {
            // find last id increment new by one
            // TODO: when object is remove fix the ID's to be in right order
            if (mongoData != undefined && mongoData.length > 0) {
                // what is the last index ID?
                lastBirthdayIndex = mongoData.length - 1;
                lastBirthdayId = mongoData[lastBirthdayIndex].id;
                let birthdayAge = findAge(birthdayDate);
                let newBirthday = {
                    id: lastBirthdayId + 1,
                    birthdayName: birthdayName,
                    birthdayDate: birthdayDate,
                    age: birthdayAge
                }

                mongoData.push(newBirthday);

                // reset state
                setBirthdayName("");
                setBirthdayDate("");
            } else {
                let birthdayAge = findAge(birthdayDate);
                let newBirthday = [{
                    id: 1,
                    birthdayName: birthdayName,
                    birthdayDate: birthdayDate,
                    age: birthdayAge
                }]
                console.log(newBirthday)
                // reset state
                setBirthdayName("");
                setBirthdayDate("");
                setMongoData(newBirthday);
            }

        } else {
            console.log('Invalid Form');
        }

        uploadToMongo();
    }

    return (
        <div style={{ width: "50%", margin: "0px auto", marginTop: "2%" }} className={classes.root}>
            <Paper style={{ backgroundColor: "#eee" }}>
                <div className="welcome-banner">
                    <h2 className="welcome-message">Welcome, <span>{userName}!</span></h2>
                    <h5 className="welcome-phone">Phone Number - <span>{formatPhoneNumber(userPhone)}</span></h5>
                    {/* <h6><Link to="/"><button className="button create-button"><span>Not you?</span></button></Link></h6> */}
                </div>
            </Paper>
            <Paper style={{ marginTop: "5%" }} className={classes.paper}>
                <div style={{ padding: "5px 0px 0px 12px" }}>
                    <div className="birthday-edit">
                        <TextField
                            style={{ padding: "5px" }}
                            name="birthdayName"
                            placeholder="Name"
                            value={birthdayName}
                            onChange={e => setBirthdayName(e.target.value)}
                            type="birthdayName"
                            id="birthdayName"
                            variant="outlined"
                            size="small"
                            InputProps={{ disableUnderline: true }}
                        />
                        {errors.birthdayNameLength &&
                            <p style={{ color: "red" }}>{errors.birthdayNameLength}</p>
                        }
                        <TextField
                            style={{ padding: "5px" }}
                            type="date"
                            name="birthdayDate"
                            placeholder="Date"
                            value={birthdayDate}
                            onChange={e => setBirthdayDate(e.target.value)}
                            id="birthdayDate"
                            variant="outlined"
                            size="small"
                        />
                        {errors.birthdayDateLength &&
                            <p style={{ color: "red" }}>{errors.birthdayDateLength}</p>
                        }
                        <div className="btn-box">
                            <Button onClick={handleAddClick}>Add</Button>
                        </div>
                    </div>
                </div>
                <EnhancedTableToolbar numSelected={selected.length} isSelected={selected} userName={userName} userPhone={userPhone} mongoData={mongoData} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.birthdayName}</TableCell>
                                            <TableCell align="right">{row.birthdayDate}</TableCell>
                                            <TableCell align="right">{row.age}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </div>
    );
}
