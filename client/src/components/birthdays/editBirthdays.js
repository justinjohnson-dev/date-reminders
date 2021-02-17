import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from "material-table";
import axios from "axios";



export default function Editable() {
    const { useState } = React;
    const [userName, setUserName] = React.useState("");
    const [userPhone, setUserPhone] = React.useState("");
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'birthdayName' },
        { title: 'Birthday', field: 'birthdayDate', type: 'date' },
    ]);

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
        console.log("upload to mongo")
        console.log(data)
        console.log(data.birthdayName)
        console.log(data.birthdayDate)

        let userInfo = {
            birthdayName: data.birthdayName,
            birthdayDate: data.birthdayName
        }
        if (data != undefined) {
            axios.post(`/api/v1/userBirthdays`, userInfo)
                .then(res => {
                    console.log("userInfo")
                    console.log(userInfo)
                })
        } else {
            console.log('Sending no data - no birthdays were added')
        }
    }

    return (
        <MaterialTable
            title="Birthdays"
            columns={columns}
            data={data}
            style={{ width: "75%", margin: "0px auto", marginTop: "5%" }}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (data == undefined) {
                                setData([newData]);
                                console.log('inside the function')
                                console.log(data)
                                uploadToMongo();
                            } else {
                                setData([...data, newData]);
                                console.log('inside the else function')
                                console.log(data)
                                uploadToMongo();
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
                            uploadToMongo();
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
                            uploadToMongo();
                            resolve()
                        }, 1000)
                    }),
            }}
        />
    )
}
