import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './AddCollection.module.css';

const BACKEND_PORT = 8080;

/**
 * Add Collection Page React Component
 * @returns React Component of page
 */
export default function AddCollection(){
    console.log("Navigted to Add Collection page");//logging

    const [inputValue, setInputValue] = useState('');//collection name input value state

    //input value change lambda
    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const navigate = useNavigate();//page navigation lambda
    const goToHome = () => {//lambda to navigate to home page
      navigate('/');
    };
    
    //add new collection lambda
    const addNewCollection = async() => { 
        //restt post to backend
        const response = await fetch(`http://localhost:${BACKEND_PORT}/allCollections`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputValue),
          });
        
          const data = await response.json();
          console.log("Sent new collection: " + inputValue + " to server");//logging
          console.log(data);
          navigate("/");
    };

    //return react component
    return(
        <div className={styles.container}>
            <div className={styles.centerContainer}>
              <button onClick={goToHome} className={styles.button}>Home</button>
              <div className={styles.buttonAndInput}>
                <input type="text"  placeholder="Name" value={inputValue} onChange={handleChange} className={styles.input}/>
                <button onClick={addNewCollection} className={styles.startButton}>Start Collection</button>
              </div>
            </div>
        </div>
    );
}