import { useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect } from 'react';

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
    useEffect(()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.DONE){
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            //setData(JSON.parse(xhr.responseText));
        }else{
            console.error(xhr.statusText);
        }
      }
    };
    //console.log("collection: " + collectionName);//for debugging
    xhr.send(JSON.stringify(collectionName));
    });
    
    console.log("Recieved " + collectionName +" data from server");
    console.log(data);//for deubgging

    if(data.length === 0){
        return(
            <div>
                <button onClick={goHome}>Home</button>
                <button onClick={()=>navigate('/addItem', {state:{collectionName}})}>Add Item</button>
                <h1>{collectionName}</h1>
            </div>
        );
    }

    return(
        <div>
            <button onClick={goHome}>Home</button>
            <button onClick={()=>navigate('/addItem', {state:{collectionName}})}>Add Item</button>
            <h1>{collectionName}</h1>
            <ul>
                {data.map((element, index)=> (
                    <li key={index}>{element}</li>
                ))}
            </ul>
        </div>
    );
}

//function AddItemButton(){
//    //const addItem = async() => {
//    //    const response = await fetch(`http://localhost:${BACKEND_PORT}/addItemToCollection`, {
//    //        method: 'POST',
//    //        headers: {
//    //            'Content-Type': 'application/json',
//    //        },
//    //        body: JSON.stringify({  }),
//    //    })
//    //};
//
//    const navigate = useNavigate();
//    const navAddItem = () => {
//        navigate('/addItem', )
//    };
//
//    return(
//        <div>
//            <button>Add Item</button>
//        </div>
//    );
//}
