import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import './birthday.css'


// Function reference from
// https://github.com/cluemediator/dynamic-input-fields-reactjs
function Birthday() {
    const [inputList, setInputList] = useState([{ birthdayName: "", birthdayDate: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { birthdayName: "", birthdayDate: "" }]);
    };

    return (
        <div className="birthday-entry">
            {inputList.map((x, i) => {
                return (
                    <div className="box">
                        <TextField
                            name="birthdayName"
                            placeholder="Name"
                            value={x.birthdayName}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <TextField
                            style={{ marginLeft: "20px" }}
                            className="ml10"
                            name="birthdayDate"
                            type="date"
                            value={x.birthdayDate}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 &&
                                <Button className="mr10" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                            {inputList.length - 1 === i &&
                                <Button onClick={handleAddClick}>Add</Button>}
                        </div>
                    </div>
                );
            })}
            {/* <div style={{ marginTop: "20%" }}>{JSON.stringify(inputList)}</div> */}
        </div>
    );
}

export default Birthday;