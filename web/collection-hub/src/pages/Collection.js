import { useNavigate, useLocation } from "react-router-dom";
import {useState} from 'react';
import styles from './Collection.module.css';

const BACKEND_PORT = 8080;
export default function Collection(){
       
    const location = useLocation();    
    const {element} = location.state || {};
    const collectionName = element.name/**.substring(15,element.name.length - 2)**/;

    console.log("Navigated to " + collectionName + " page"); 

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    };
    

    const [data, setData] = useState([]);
    const [trigger, setTrigger] = useState(false);
    
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
    
    
    console.log("Recieved " + collectionName +" data from server");

    const deleteCollection = async() => {
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
    };

    if(data.length === 0){
        return(
            <div className={styles.container}>
                <div className={styles.left}>
                    <button onClick={goHome} className={styles.button}>Home</button>
                    <button onClick={()=>navigate('/addItem', {state:{collectionName}})} className={styles.button}>Add Item</button>
                    <button onClick={deleteCollection} className={styles.button}>Delete Collection</button>
                </div>
                <div className={styles.right}>
                    <h1 className={styles.header}>{collectionName}</h1>
                </div>
            </div>
        );
    } 

    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <button onClick={goHome} className={styles.button}>Home</button>
                <button onClick={()=>navigate('/addItem', {state:{collectionName}})} className={styles.button}>Add Item</button>
                <button onClick={deleteCollection} className={styles.button}>Delete Collection</button>
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


