import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './AddItem.module.css';

const BACKEND_PORT = 8080;

/**
 * Add Item Page React Component
 * @returns React Component of Add Item Page
 */
export default function AddItem(){
    console.log("Navigated to Add Item page");//logging

    const navigate = useNavigate();//navigation lambda
    const location = useLocation();//location lambda to use passed page state
    const {collectionName} = location.state || {};//collection name from passed page state
    const [inputValueName, setValueName] = useState('');//item name state
    const [inputValueSeries, setValueSeries] = useState('');//series name state
    const [inputValueNumber, setValueNumber] = useState('');//number state
    const [inputValueDR, setValueDR] = useState('');//date of release state
    const [inputValueDA, setValueDA] = useState('');//date of acquisition state
    const [inputValuePR, setValuePR] = useState('');//production run state
    const handleChangeName = (event) => {//name change lambda
        setValueName(event.target.value);
    };
    const handleChangeSeries = (event) => {//series change lambda
        setValueSeries(event.target.value);
    };
    const handleChangeNumber = (event) => {//number change lambda
        setValueNumber(event.target.value);
    };
    const handleChangeDR = (event) => {//date of release change lambda
        setValueDR(event.target.value);
    };
    const handleChangeDA = (event) => {//date of acquisition change lambda
        setValueDA(event.target.value);
    };
    const handleChangePR = (event) => {//production run change lambda
        setValuePR(event.target.value);
    };
    const element = {name: collectionName};//create page state anonymous object for parsing in collection component
    const jsonFormData = {//json form to be body of rest call to backend
        collectionName: collectionName,
        name: inputValueName,
        series: inputValueSeries,
        number: inputValueNumber,
        dateReleased: inputValueDR,
        dateOfAcquisition: inputValueDA,
        productionRun: inputValuePR
    };

    //add item lambda
    const addItem = async() => {
        //rest post call to backend
        const response = await fetch(`http://localhost:${BACKEND_PORT}/addToCollections`, {
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
               body: JSON.stringify(jsonFormData)
            });

            const data = await response.json();
            console.log("Sent item " + inputValueName + " to be added to " + collectionName);//logging
            console.log(data);
            navigate('/viewCollection', {state:{element}});
        };

    //return react component
    return(
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                <div data-testid='inputs' className={styles.buttonAndInput}>
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