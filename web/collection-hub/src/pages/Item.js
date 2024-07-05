import { useNavigate, useLocation } from "react-router-dom";
import styles from './Item.module.css';
import { useState } from "react";

const BACKEND_PORT = 8080;

export default function Item(){
    console.log("Navigated to Item page");

    const location = useLocation();
    const {element} = location.state || {};
    const collectionName = element.collectionName;
    const itemName = element.name;
    const series = element.series;
    const number = element.number;
    const releaseDate = element.dateReleased;
    const acquiDate = element.dateOfAcqusition;
    const prodRun = element.productionRun;

    const navigate = useNavigate();

    const deleteItem = async () => {
        setShowWarning(true);
    };

    const navigateBack = () => {
        element.name = collectionName;
        navigate('/viewCollection', {state: {element}});
    }

    const [showWarning, setShowWarning] = useState(false);

    const handleYes = async () => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/deleteFromCollections`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(element)
        });

        const data = await response.json();
        console.log("Deleted " + itemName);
        console.log(data);
        element.name = collectionName;//for how collection uses this data
        navigate('/viewCollection', {state: {element}});
    }

    const handleNo = () => {
        setShowWarning(false);
    }

    return(
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                <div className={styles.buttonAndDescription}>
                    <button onClick={() => navigate('/')} className={styles.button}>Home</button>
                    <button onClick={navigateBack} className={styles.button}>Back</button>
                    <button onClick={deleteItem} className={styles.button}>Delete Item</button>
                    { showWarning && (
                    <div className={styles.warning}>
                        <div className={styles.warningContent}>
                            <h1>Are you sure you want to delete this item from the collection?</h1>
                            <div>
                                <button className={styles.button} onClick={handleYes}>Yes</button>
                                <button className={styles.button} onClick={handleNo}>No</button>
                            </div>
                        </div>
                    </div>
                    )}
                    <h1 className={styles.header}>{itemName}</h1>
                    <ul>
                        <li className={styles.info}>Collection: {collectionName}</li>
                        <li className={styles.info}>Series: {series}</li>
                        <li className={styles.info}>Number: {number}</li>
                        <li className={styles.info}>Release Date: {releaseDate}</li>
                        <li className={styles.info}>Acquisition Date: {acquiDate}</li>
                        <li className={styles.info}>Production Run: {prodRun}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}