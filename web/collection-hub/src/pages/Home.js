import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';

const BACKEND_PORT = 8080;

/**
 * Home Page React Component
 * @returns React Component of Homee Page
 */
export default function Home(){ 
    console.log("Navigated Home");//logging

    //return react component
    return(
        <div className={styles.container}>
            <div className={styles.left}>
              <h1 className={styles.header}>
                  CollectionHub
              </h1>
            </div>
            <div className={styles.right}>
              <AddCollectionButton/>
              <CollectionButton/>
            </div>
        </div>
    );
}

/**
 * Add Collection Button React Component
 * @returns React Component of add collection button
 */
function AddCollectionButton(){
  const navigate = useNavigate();//navigation lambda
  const goToAddCollection = () => {//got to add collection page lambda
    navigate('/addCollection');
  };

  //return react component
  return(
    <div>
      <button onClick={goToAddCollection}  className={styles.button}>Add Collection</button>
    </div>
  );
}
  
/**
 * Collection Button React Component
 * @returns React Component of Collection button
 */
function CollectionButton(){
    const [data, setData] = useState([]);//data state that will be return of future rest call
    const navigate = useNavigate();//navigation lambda

    //rest get call to backend
    useEffect(()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:${BACKEND_PORT}/allCollections`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
    }, []);
    
    console.log("Recieved collection data from server");//logging
  
    //cases for returning a react component
    if(data.length === 0){
      return(
        <div></div>
      );
    }
    return(
      <div>
          {data.map((element, index) => (//iterate through data of returned json list and map to html components
            <button key={index} onClick={() => navigate('/viewCollection', {state:{element}})} className={styles.collectionButton}>{element.name/**.substring(15,element.name.length - 2)**/}</button>
          ))}
      </div>
    );
}