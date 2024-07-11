import { useNavigate, useLocation } from "react-router-dom";
import {useState} from 'react';
import styles from './Collection.module.css';

const BACKEND_PORT = 8080;

/**
 * Collection React Component to display collection page
 */
export default function Collection(){
       
    const location = useLocation();//page location    
    const {element} = location.state || {};//passed page state aka props
    const collectionName = element.name;//name of collection

    console.log("Navigated to " + collectionName + " page");//logging

    const navigate = useNavigate();//navigate lambda
    const goHome = () => {//go home lambda
        navigate('/');
    };
    

    const [data, setData] = useState([]);//data state
    const [trigger, setTrigger] = useState(false);//trigger for button click
    
    //post to get collection to be displayed on page
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE){
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            if(!trigger){
                setData(JSON.parse(xhr.responseText));
                setTrigger(true);
            }
            return;
        }else{
            console.error(xhr.statusText);
        }
      }
    };
    xhr.send(JSON.stringify(collectionName));
    
    
    console.log("Recieved " + collectionName +" data from server");//logging

    //delete collection lambda
    const deleteCollection = async() => {
        setShowWarning(true);
    };

    const [showWarning, setShowWarning] = useState(false);//delete warning state

    //lambda for confirmation of collection delete
    const handleYes = async () => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/allCollections`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collectionName)
        });
        
        const data = await response.json();
        console.log("Sent item " + collectionName + " to be deleted");
        console.log(data);
        navigate('/');
    }

    //handle no choice in warning lambda
    const handleNo = () => {
        setShowWarning(false);
    }

    //html component if collection has no items
    if(data.length === 0){
        return(
            <div className={styles.container}>
                <div className={styles.left}>
                    <button data-testid='homeButton' onClick={goHome} className={styles.button}>Home</button>
                    <button onClick={()=>navigate('/addItem', {state:{collectionName}})} className={styles.button}>Add Item</button>
                    <button onClick={deleteCollection} className={styles.button}>Delete Collection</button>
                    { showWarning && (
                    <div className={styles.warning}>
                        <div className={styles.warningContent}>
                            <h1>Are you sure you want to delete this collection?</h1>
                            <div>
                                <button className={styles.button} onClick={handleYes}>Yes</button>
                                <button className={styles.button} onClick={handleNo}>No</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className={styles.right}>
                    <h1 className={styles.header}>{collectionName}</h1>
                </div>
            </div>
        );
    } 

    //default collection html component
    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <button data-testid='homeButton' onClick={goHome} className={styles.button}>Home</button>
                <button onClick={()=>navigate('/addItem', {state:{collectionName}})} className={styles.button}>Add Item</button>
                <button onClick={deleteCollection} className={styles.button}>Delete Collection</button>
                { showWarning && (
                <div className={styles.warning}>
                    <div className={styles.warningContent}>
                        <h1>Are you sure you want to delete this collection?</h1>
                        <div>
                            <button className={styles.button} onClick={handleYes}>Yes</button>
                            <button className={styles.button} onClick={handleNo}>No</button>
                        </div>
                    </div>
                </div>
                )}
                {data.collectionList.map((element, index)=> (
                    <button key={index} onClick={() => navigate('/viewItem', {state: {element}})} className={styles.itemButton}>{element.name}</button>
                ))}
            </div>
            <div className={styles.right}>
                <h1 className={styles.header}>{collectionName}</h1>
            </div>
        </div>
    );
}


