import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_PORT = 8080;

export default function Item(){
    console.log("Navigated to Item page");

    const location = useLocation();
    const {element} = location.state || {};
    const collectionName = element.collectionName;
    const itemName = element.name;
    const series = element.series;
    const number = element.number;
    const releaseDate = element.dateReleased;
    const acquiDate = element.dateOfAcqusition;
    const prodRun = element.productionRun;

    const navigate = useNavigate();

    const deleteItem = async () => {
        const response = await fetch(`http://localhost:${BACKEND_PORT}/deleteFromCollections`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(element)
        });

        const data = await response.json();
        console.log("Deleted " + itemName);
        console.log(data);
        element.name = collectionName;//for how collection uses this data
        navigate('/viewCollection', {state: {element}});
    };

    return(
        <div>
            <button onClick={() => navigate('/')}>Home</button>
            <button>Back</button>
            <button onClick={deleteItem}>Delete Item</button>
            <h1>{itemName}</h1>
            <ul>
                <li>Collection: {collectionName}</li>
                <li>Series: {series}</li>
                <li>Number: {number}</li>
                <li>Release Date: {releaseDate}</li>
                <li>Acquisition Date: {acquiDate}</li>
                <li>Production Run: {prodRun}</li>
            </ul>
        </div>
    );
}