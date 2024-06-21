import { useState, useEffect } from "react";

const BACKEND_PORT = 8080;

export default function Home(){
    return(
        <div>
            <h1>
                Welcome to CollectionHub!
            </h1>
            <CollectionButton/>
        </div>
    );
  }
  
  
  function CollectionButton(){
    const [data, setData] = useState([]);
    
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
    
    console.log(data);//for deubgging
  
    if(data.length === 0){
      return(
        <div></div>
      );
    }
    return(
      <div>
        data
      </div>
    );
  }