import { useLocation } from "react-router-dom";
import { useState } from "react";
import OpenAI from "openai";
import axios from 'axios';

const BACKEND_PORT = 8080;
//const ai = new OpenAI({dangerouslyAllowBrowser: true});
const ai = new OpenAI();
//IMPORTANT: might need to change to groq to be free

//this component will be used in Collection component
export default function EbayLink(){
    const location = useLocation();
    const {element} = location.state||{};
    const collectionName = element.name;
    const [data, setData] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [trigger, setTrigger] = useState(false);
    //query backend for list of item already contained
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
    xhr.onreadystatechange = function(){
        if(this.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                console.log(xhr.responseText);
                if(!trigger){
                    setData(JSON.parse(xhr.responseText));
                    setTrigger(true);
                }
            return;
            }
        }else{
            console.error(xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(collectionName));
    console.log("Received " + collectionName + " data for open ai use");
    //query open ai using list of elements in collection already to get good ebay search
    const openAiQuery = async () =>{
        const search = await ai.chat.completions.create({
            messages: [{ role: "system", content: `Give me an ebay search for ${collectionName} products that does not contain ${data}` }],//use data state here for query
            model: "gpt-3.5-turbo",
        });
        setSearchStr(search.choices[0]);
        console.log(search.choices[0]);//for debugging
    };
    openAiQuery();
    //hit ebay api to get link of search results
    const ebaySearch = async () => {
        const response = await axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search', {
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',//need to change this
                'Content-Type': 'application/json'
            },
            params: {
              q: searchStr,
              limit: 10
            }
        });
        setSearchResults(response.data.itemSummaries);
        console.log(searchResults);//for debugging
    };
    //ebaySearch();//commented out to debug openai query
    //render search result link in return html of react component
    
    //QUESTION: should we save the queries in a backend repository for reuse?
    return(
        <div></div>
    );
}