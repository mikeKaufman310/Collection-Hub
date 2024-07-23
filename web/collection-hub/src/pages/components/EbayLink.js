import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Groq from "groq-sdk";
import axios from 'axios';

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
            contentStr+=(" or " + recvList[i].name);
        }
        
        //query ai
        console.log(contentStr);//for debuggin
        const search = await ai.chat.completions.create({
            messages: [{ role: "user", content: `${contentStr}` }],//use data state here for query
            model: "llama3-8b-8192",
        });
        setSearchStr(search.choices[0]);//use hook to change state
        console.log(search.choices[0].message.content);//for debugging
        //ebaySearch();//commented out for debugging purposes
    };

    useEffect(()=>{
        aiQuery();
    },[]);

    //hit ebay api to get link of search results
    const ebaySearch = async () => {
        const response = await axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search', {
            headers: {
                'Authorization': 'Bearer v^1.1#i^1#I^3#f^0#r^0#p^1#t^H4sIAAAAAAAAAOVYe2gURxi/y8N30oqi1Yoc29ZW4+3O7r0X7+jlZU7z0juDEaud253NbbK3e+7smlzRcqZUmqQitYh9ilaLVCka7ENaEURJqYVa0eKrLUUtloothUKloO3cXYyXVDSagwa6/ywz8z1/8z1mBqTGjJ+3sWbjnyXWsQU7UiBVYLWyE8H4McVlpYUFM4stIIfAuiP1ZKqos/DnBRjGlQS/FOGEpmJk64grKuYzk37K1FVeg1jGvArjCPOGwIeDdbU8RwM+oWuGJmgKZQtV+ikHkpDgFt1e1uVkWYeLzKq3ZUY0P+WTIACcyxnlWCh6fA6yjrGJQio2oGr4KQ5wTjvw2DlHhHXyThcPvLTX4VpB2ZqQjmVNJSQ0oAIZc/kMr55j671NhRgj3SBCqEAoWB1uCIYqq+ojC5gcWYF+HMIGNEw8eFShicjWBBUT3VsNzlDzYVMQEMYUE8hqGCyUD9425iHMz0DtjrqQIwpE6BW8rNct5gXKak2PQ+PedqRnZNEuZUh5pBqykbwfogSNaCsSjP5RPRERqrSlf0tMqMiSjHQ/VVUebA42NlKBOlmIQaQstpO4UgiXbA+XL7dzgtvn8IgQ2qHgFKKi4OhXlJXWD/MQTRWaKspp0LCtXjPKEbEaDcXGkYMNIWpQG/SgZKQtyqVz38aQ86xIb2p2F00jpqb3FcUJELbM8P47MMBtGLocNQ00IGHoQgYiPwUTCVmkhi5mYrE/fDqwn4oZRoJnmPb2drrdQWt6C8MBwDLL62rDQgzFIUVo07mepZfvz2CXM64IiHBimTeSCWJLB4lVYoDaQgWcJJN93n7cB5sVGDr7r4kcn5nBGZGvDJGcSPJwHofg8wKOBTAfGRLoD1ImbQeKwqQ9DvU2ZCQUKCASryo240iXRRJUEufwSsguun2S3emTJHvUJbrtrIQQQCgaFQaQ+18kynBDPYwEHRl5ifW8xbkZX8vUlbm4ylBzfUWbbxG7PFQX7mheVKYtXLg0IlWXO1yC0VTb6qtq8w83G+7qfIUiE2QiRH8+AEjnev5AqNGwgcQRuRcWtARq1BRZSI6uDXboYiPUjWS5mSTjMFIU8huRq8FEIpSfip03Jx+wWDyc3/nrVP9Rl7qrVzgduKPLqzQ/JgJgQqZJH0rnepIWtDijQXIISU+vzlhtG0J4VyImaibpFhNhg1giknPgsJlkUsxp0tLE4bNkGyZxYvgs5JIhmoLxUIoynZkmaMotMQM/kM6OkYASNZW24bOICCojClGZXDVGVYAST7Muy2L2jkBn/KbxWoHWEdZMnVyP6Ib0kTmitSGVHEAMPV2Z9CZ2xKU3HjcNGFXQaKvBeahFMsl1641RdkJiPRzrcbp8YGS+CZnzz+rR1kHy3Tkf4CbEDH6XCVgyH9tpPQE6rX0FViuoBHa2DMwdU7isqHAShUntoTFUxajWQctQoknZU6Fh6ohuQ8kElPWCKZav1ljmpybUMAe6V3aWRVqTlnE5z0M7ngOPDTwQjS9kJ+a8FoFZd1aK2Ueml3BO4OEcrNPpAt4V4Ik7q0XstKKpP627JK1xfdT71/pdXOyZlYnnW8auAyUDRFZrsYXEsmXC76tePlez9eqF3i/Xlxxeuat3z3fnnwaHvKVV67pe6wqNTe0+te30wa7Zb23T645s/rZ994yj0s05L7ur3dKNYKr37XEXH715puJ9ZV/3qubr11tnbDr9a/1+tXTub4d6Fku/zN87Uz9xcVzfu682uPs+5/Zt+HB6d+2cJe9teX1D5apjx2t2bz9Yqh8/w/198/gHVzr/mNzct+3ynonbZ6+p29k47+zUWCAS3jnps5NMzyuHG5+aeuvgMeEWKLrUM237xZLHf9Q2W65OP584+s3Gvc/OiF07e3LW198D+5QjHzPQ0nntSsO0l47gngOFW87t/2K18MPkTz/ZuuzsG5e7L0xGJ18MbnqB6nqHefNUdk//AfT8qXy4EwAA',//need to change this
                'Content-Type': 'application/json'
            },
            params: {
              q: searchStr,
              limit: 10
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