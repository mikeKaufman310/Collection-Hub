import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './AddItem.module.css';

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
    const element = {name: collectionName};//bc of parsing in collection component
    const jsonFormData = {
        collectionName: collectionName,
        name: inputValueName,
        series: inputValueSeries,
        number: inputValueNumber,
        dateReleased: inputValueDR,
        dateOfAcquisition: inputValueDA,
        productionRun: inputValuePR
    };
    //console.log(JSON.stringify(jsonFormData));//for debugging
    const addItem = async() => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/addToCollections`, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify(jsonFormData)
            });

            const data = await response.json();
            console.log("Sent item " + inputValueName + " to be added to " + collectionName);
            console.log(data);
            navigate('/viewCollection', {state:{element}});
        };

    return(
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                <div className={styles.buttonAndInput}>
                    <input type="text" placeholder="Name" value={inputValueName} onChange={handleChangeName} className={styles.input}/>
                    <input type="text" placeholder="Series (Optional)" value={inputValueSeries} onChange={handleChangeSeries} className={styles.input}/>
                    <input type="text" placeholder="Number (Optional)" value={inputValueNumber} onChange={handleChangeNumber} className={styles.input}/>
                    <input type="text" placeholder="Date of Release (MM/DD/YY) (Optional)" value={inputValueDR} onChange={handleChangeDR} className={styles.input}/>
                    <input type="text" placeholder="Date of Acquisition (MM/DD/YY) (Optional)" value={inputValueDA} onChange={handleChangeDA} className={styles.input}/>
                    <input type="text" placeholder="Production Run (Optional)" value={inputValuePR} onChange={handleChangePR} className={styles.input}/>
                    <button onClick={addItem} className={styles.button}>Add Item</button>
                </div>
            </div>
        </div>
    );
}