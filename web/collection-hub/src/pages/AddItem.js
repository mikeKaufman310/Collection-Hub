import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_PORT = 8080;

export default function AddItem(){
    console.log("Navigated to Add Item page");

    const navigate = useNavigate();
    const location = useLocation();
    const {collectionName} = location.state || {};
    const [inputValueName, setValueName] = useState('');
    const [inputValueSeries, setValueSeries] = useState('');
    const [inputValueNumber, setValueNumber] = useState('');
    const [inputValueDR, setValueDR] = useState('');
    const [inputValueDA, setValueDA] = useState('');
    const [inputValuePR, setValuePR] = useState('');
    const handleChangeName = (event) => {
        setValueName(event.target.value);
    };
    const handleChangeSeries = (event) => {
        setValueSeries(event.target.value);
    };
    const handleChangeNumber = (event) => {
        setValueNumber(event.target.value);
    };
    const handleChangeDR = (event) => {
        setValueDR(event.target.value);
    };
    const handleChangeDA = (event) => {
        setValueDA(event.target.value);
    };
    const handleChangePR = (event) => {
        setValuePR(event.target.value);
    };
    const stateCollectionName = "xxxxxxxxxxxxxx"+collectionName+"x";//bc of parsing in collection component
    const addItem = async() => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/addItemToCollection`, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify({ collectionName, inputValueName, inputValueSeries, inputValueNumber, inputValueDR, inputValueDA, inputValuePR}),
            });

            const data = await response.json();
            console.log("Sent item " + inputValueName + " to be added to " + collectionName);
            console.log(data);
            navigate('/viewCollection', {state:{stateCollectionName}});
        };

    return(
        <div>
            <input type="text" placeholder="Name" value={inputValueName} onChange={handleChangeName}>Name</input>
            <input type="text" placeholder="Series" value={inputValueSeries} onChange={handleChangeSeries}>Series (Optional)</input>
            <input type="text" placeholder="Number" value={inputValueNumber} onChange={handleChangeNumber}>Number (Optional)</input>
            <input type="text" placeholder="DR" value={inputValueDR} onChange={handleChangeDR}>Date of Release (MM/DD/YY) (Optional)</input>
            <input type="text" placeholder="DA" value={inputValueDA} onChange={handleChangeDA}>Date of Acquisition (MM/DD/YY) (Optional)</input>
            <input type="text" placeholder="PR" value={inputValuePR} onChange={handleChangePR}>Production Run (Optional)</input>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}