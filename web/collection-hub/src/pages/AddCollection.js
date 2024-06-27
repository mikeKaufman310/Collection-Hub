import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_PORT = 8080;

export default function AddCollection(){
    console.log("Navigted to Add Collection page");

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const navigate = useNavigate();
    const goToHome = () => {
      navigate('/');
    };
    
    const addNewCollection = async() => { 
        
        const response = await fetch(`http://localhost:${BACKEND_PORT}/allCollections`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputValue),
          });
        
          const data = await response.json();
          console.log("Sent new collection: " + inputValue + " to server");
          console.log(data);
          navigate("/");
    };

    return(
        <div>
            <button onClick={goToHome}>Home</button>
            <input type="text"  placeholder="Name" value={inputValue} onChange={handleChange}/>
            <button onClick={addNewCollection}>Start Collection</button>
        </div>
    );
}