import React, { useEffect, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import './birthday.css';


const useStyles = makeStyles({
    root: {
        width: "55%",
        margin: "0px auto",
        marginTop: "2%",
        "@media (max-width: 600px)": {
            width: '95%'
        },
        "@media (min-width: 600px) and (max-width: 800px)": {
            width: '95%'
        },
    },
    uploadButtonPushed: {
        backgroundColor: 'green'
    },
    uploadButtonDiv: {
        float: 'right',
        marginTop: '1%',
        marginBottom: '10%',
        "@media (max-width: 600px)": {
            marginTop: '3%'
        },
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
    }
});

export default function Editable() {
    const { useState } = React;
    const [userName, setUserName] = React.useState("");
    const [userPhone, setUserPhone] = React.useState("");
    const [data, setData] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'birthdayName' },
        { title: 'Birthday', field: 'birthdayDate', type: 'date' },
    ]);
    const classes = useStyles();
    const myTextIcon = React.useRef(null);

    useEffect(() => {
        let userInformation = localStorage.getItem('user');
        let userName = userInformation.substr(0, userInformation.indexOf(',')).trim();
        let userPhone = userInformation.substr(userInformation.indexOf(','), userInformation.length).replace(',', '').trim();
        setUserName(userName);
        setUserPhone(userPhone);
        axios.get(`/api/v1/birthdays/${userPhone}`)
            .then(response => setData(response.data.birthdays));
    }, []);

    const uploadToMongo = () => {
        setUploadStatus(true);
        let userInfo = {
            name: userName,
            phone_number: userPhone,
            birthdays: data
        };

        if (data != undefined) {
            axios.post(`/api/v1/userBirthdays`, userInfo)
                .then(res => {
                    console.log("userInfo")
                    console.log(userInfo)
                })
        } else {
            console.log('Sending no data - no birthdays were added')
        }

        setTimeout(() => {
            setUploadStatus(false)
        }, 3000);
    }

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    const fetchTitle = () => {
        return (
            <i style={{ fontSize: '25px' }} class="fas fa-birthday-cake"></i>
        )
    }

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} style={{ color: 'green' }} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} style={{ color: 'red' }} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    return (
        <div className={classes.root} >
            <Paper style={{ backgroundColor: "#eee" }}>
                <div className="welcome-banner">
                    <h2 className="welcome-message">Welcome, <span>{userName}!</span></h2>
                    <h5 className="welcome-phone">Phone Number - <span>{formatPhoneNumber(userPhone)}</span></h5>
                    {/* <h6><Link style={{ textDecoration: 'none' }} to="/"><Button variant="outlined" style={{ fontSize: '10px' }}><span>Not you?</span></Button></Link></h6> */}
                </div>
            </Paper>
            <MaterialTable
                title={fetchTitle()}
                columns={columns}
                data={data}
                icons={tableIcons}
                style={{ marginTop: "5%" }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (data == undefined) {
                                    setData([newData]);
                                } else {
                                    setData([...data, newData]);
                                }
                                resolve();
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                resolve()
                            }, 1000)
                        }),
                }}
            />
            <div className={classes.uploadButtonDiv}>
                {uploadStatus == false &&
                    <Button onClick={uploadToMongo} type="submit" variant="contained" color="primary">
                        Upload!
                    </Button>
                }
                {uploadStatus == true &&
                    <Button onClick={uploadToMongo} className={classes.uploadButtonPushed} type="submit" variant="contained" color="primary">
                        Successfully updated!
                    </Button>
                }
            </div>
        </div>
    )
}
