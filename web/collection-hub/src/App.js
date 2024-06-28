
import {  BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddCollection from './pages/AddCollection';
import Collection from './pages/Collection';
import AddItem from './pages/AddItem';
import Item from './pages/Item';

export default function App(){
  return(
    <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/addCollection">Add Collection</Link></li>
                        <li><Link to="/viewCollection">View Collection</Link></li>
                        <li><Link to="/addItem">Add Item</Link></li>
                        <li><Link to="/viewItem">View Item</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addCollection" element={<AddCollection />}/>
                    <Route path='/viewCollection' element={<Collection />}/>
                    <Route path='/addItem' element={<AddItem />}/>
                    <Route path='/viewItem' element={<Item />}/>
                </Routes>
            </div>
        </Router>
  );
}

