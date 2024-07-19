import { useState, useLocation } from "react-router-dom";

const BACKEND_PORT = 8080;

//this component will be used in Collection component
export default function EbayLink(){
    const location = useLocation();
    const {element} = location.state||{};
    const collectionName = element.name;
    const [data, setData] = useState([]);
    //query backend for list of item already contained
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
    xhr.onreadystatechange = function(){
        if(this.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                console.log(xhr.responseText);
                //if(!trigger){
                    setData(JSON.parse(xhr.responseText));
                    //setTrigger(true);
                //}
            return;
            }
        }else{
            console.error(xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(collectionName));
    console.log("Received " + collectionName + " data for open ai use");
    //query open ai using list of elements in collection already to get good ebay search
    //hit ebay api to get link of search results
    //render search result link in return html of react component
    
    //QUESTION: should we save the queries in a backend repository for reuse?
    return(
        <div></div>
    );
}