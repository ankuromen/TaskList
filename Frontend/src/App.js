import './App.css';

import { Routes, Route } from "react-router-dom"
import Login from './integration/Login';
import Home from './integration/Home';
import Privatecomponent from './integration/privatecomponent.js';
import Register from './integration/Register';



const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("port=",BASE_URL);

function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="register" element={<Register/>} />{/*non protected routes*/} 
      <Route path="/" element={<Login />} />
        
        <Route element={<Privatecomponent />}>{/*protected routes*/} 

          <Route path="home" element={<Home />} />
        
           </Route>

       


      </Routes>
    </div>
  );
}

export default App;

