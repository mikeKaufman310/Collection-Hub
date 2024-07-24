import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Groq from "groq-sdk";
import axios from 'axios';
import qs from 'qs';
import base64 from 'base-64';

const BACKEND_PORT = 8080;
const ai = new Groq({apiKey:'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', dangerouslyAllowBrowser:true});

//this component will be used in Collection component
export default function EbayLink(){
    const location = useLocation();//location for passed props
    const {element} = location.state||{};//collection name passed to components
    const collectionName = element.name;//collection name removed from passed anon object
    const [data, setData] = useState([]);//data received from backend about collection contents
    const [searchStr, setSearchStr] = useState('');//string to be used for ai search state
    const [searchResults, setSearchResults] = useState([]);//ebay search result string
    const [trigger, setTrigger] = useState(false);//trigger for single backend api call
    const [aiTrig, setAiTrig] = useState(false);//trigger for single ai api call

    //query backend for list of item already contained
    const collectionCall = ()=>{
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `http://localhost:${BACKEND_PORT}/getCollection`, true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState===XMLHttpRequest.DONE){
                    if(xhr.status===200){
                        console.log(xhr.responseText);
                        if(!trigger){
                            resolve(JSON.parse(xhr.responseText));
                            setTrigger(true);
                        }
                        return;
                    }else{
                        reject(xhr.status);
                    }
                }
            };
            xhr.send(JSON.stringify(collectionName));
            console.log("Received " + collectionName + " data for open ai use");//logging
        });
    };

    //query open ai using list of elements in collection already to get good ebay search
    const aiQuery = async () =>{
        const collectionData = await collectionCall();
        let contentStr = `With no other words, give me a single example of an ebay search for ${collectionName} products that does not contain`;//string to build query for groq model
        //console.log(data);//for debuggin
        const recvList = collectionData.collectionList;
        for(let i = 0; i < recvList.length; i++){//build string
            if(i===0){
                contentStr+=(" " + recvList[i].name);
            }else{
                contentStr+=(" or " + recvList[i].name);
            }
        }

        //query ai
        console.log(contentStr);//for debuggin
        const search = await ai.chat.completions.create({
            messages: [{ role: "user", content: `${contentStr}` }],//use data state here for query
            model: "llama3-8b-8192",
        });
        //setSearchStr(search.choices[0]);//use hook to change state
        //console.log(search.choices[0].message.content);//for debugging
        ebayTokenGet().then(accessToken=>ebaySearch(search.choices[0].message.content, accessToken));//commented out for debugging purposes
    };

    useEffect(()=>{
        aiQuery();
    },[]);

    const ebayTokenGet = async ()=>{
        const auth = base64.encode("MichaelK-collecti-SBX-2c6937daa-ac4cbdc3:SBX-e0b1e5f0fc5b-b166-467a-8c5a-3d8a");
        try{
            //axios post to get access token
            const response = await axios.post('https://api.ebay.com/identity/v1/oauth2/token',
                qs.stringify({
                    grant_type: 'client_credentials',
                    scope: 'https://api.ebay.com/oauth/api_scope'
                }),{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${auth}`
                    }
                }
            );
            return response.data.access_token;//returns empty string temporarily for mocking purposes
        }catch(error){
            console.error(error);
        }
    }

    //hit ebay api to get link of search results
    const ebaySearch = async (data, accessToken) => {
        const response = await axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            params: {
              q: data,
              //limit: 10
            }
        });
        setSearchResults(response.data.itemSummaries);//use hook to change result state
        console.log(searchResults);//for debugging
    };
    //render search result link in return html of react component
    
    //QUESTION: should we save the queries in a backend repository for reuse? after thought, not, because collection may grow or shrink since last query
    return(
        <div></div>
    );
}