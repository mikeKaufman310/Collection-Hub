import { useLocation } from "react-router-dom";
import { useState } from "react";
import Groq from "groq-sdk";
import axios from 'axios';

const BACKEND_PORT = 8080;
//const ai = new OpenAI();
const ai = new Groq({apiKey:'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', dangerouslyAllowBrowser:true});
//console.log(process.env.GROQ_API_KEY);
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
    const [aiTrig, setAiTrig] = useState(false);
    //query backend for list of item already contained
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
    xhr.onreadystatechange = function(){
        if(this.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                //console.log(xhr.responseText);
                if(!trigger){
                    setData(JSON.parse(xhr.responseText));
                    setTrigger(true);
                    if(!aiTrig){
                        aiQuery();
                        setAiTrig(true);
                    }
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
    const aiQuery = async () =>{
        let contentStr = `Give me an example of an ebay search for ${collectionName} products that does not contain`;
        for(let i = 0; i < data.collectionList.length; i++){
            contentStr+=(" " + data.collectionList[i].name);
        }
        const search = await ai.chat.completions.create({
            messages: [{ role: "user", content: `${contentStr}` }],//use data state here for query
            model: "llama3-8b-8192",
        });
        setSearchStr(search.choices[0]);
        console.log(search.choices[0].message.content);//for debugging
    };
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