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
    const element = {name: "xxxxxxxxxxxxxx"+collectionName+"x"};//bc of parsing in collection component
    //console.log(element.name);//for debugging
    const addItem = async() => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/allCollections`, {
               method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: 
                JSON.stringify({ 
                    collectionName: {collectionName}, 
                    name: {inputValueName}, 
                    series: {inputValueSeries}, 
                    number: {inputValueNumber}, 
                    dateReleased: {inputValueDR}, 
                    dateOfAcquisition: {inputValueDA}, 
                    productionRun: {inputValuePR}
                }),
            });

            const data = await response.json();
            console.log("Sent item " + inputValueName + " to be added to " + collectionName);
            console.log(data);
            navigate('/viewCollection', {state:{element}});
        };

    return(
        <div>
            <input type="text" placeholder="Name" value={inputValueName} onChange={handleChangeName}/>
            <input type="text" placeholder="Series (Optional)" value={inputValueSeries} onChange={handleChangeSeries}/>
            <input type="text" placeholder="Number (Optional)" value={inputValueNumber} onChange={handleChangeNumber}/>
            <input type="text" placeholder="Date of Release (MM/DD/YY) (Optional)" value={inputValueDR} onChange={handleChangeDR}/>
            <input type="text" placeholder="Date of Acquisition (MM/DD/YY) (Optional)" value={inputValueDA} onChange={handleChangeDA}/>
            <input type="text" placeholder="Production Run (Optional)" value={inputValuePR} onChange={handleChangePR}/>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}