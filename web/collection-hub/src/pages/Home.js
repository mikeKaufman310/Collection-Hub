import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';

const BACKEND_PORT = 8080;

export default function Home(){ 
    console.log("Navigated Home");
    return(
        <div className={styles.container}>
            <div className={styles.left}>
              <h1 className={styles.header}>
                  CollectionHub
              </h1>
            </div>
            <div className={styles.right}>
              <CollectionButton/>
              <AddCollectionButton/>
            </div>
        </div>
    );
}

function AddCollectionButton(){
  const navigate = useNavigate();
  const goToAddCollection = () => {
    navigate('/addCollection');
  };
  return(
    <div>
      <button onClick={goToAddCollection}>Add Collection</button>
    </div>
  );
}
  
  
function CollectionButton(){
    const [data, setData] = useState([]);
    const navigate = useNavigate();
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
    
    console.log("Recieved collection data from server");
    console.log(data);//for deubgging
  
    if(data.length === 0){
      return(
        <div></div>
      );
    }
    return(
      <div>
        <ul>
          {data.map((element, index) => (
            <button key={index} onClick={() => navigate('/viewCollection', {state:{element}})}>{element.name/**.substring(15,element.name.length - 2)**/}</button>
          ))}
        </ul>
      </div>
    );
}