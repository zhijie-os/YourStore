// import SearchBar from './components/searchBar.jsx'
import NavBar from './components/navBar.jsx'
import Footer from './components/footer.jsx';
import ProductSearchResult from './customer/complex/searchResult.jsx';
import CustomerHome from './customer/pages/customerHome.jsx';
import Login from './login.jsx';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState } from 'react';
import { GlobalState } from './Redux/globalState.js';

function App() {

  const [userInfo, setUserInfo] = useState({ID:null,UserType:null});

  return (
    <GlobalState/>
    // <Router>
    //     <div className="App">
    //       <Routes>
    //         <Route exact path="/" element={<Login updater={(info)=>setUserInfo(info)}/>} />
    //         <Route exact path="/login" element={<Login updater={(info)=>setUserInfo(info)}/>} />
    //         <Route exact path="/home" element={<CustomerHome userType={userInfo.UserType}/>} />
    //       </Routes>
    //     </div>
    // </Router >
  );
}

export default App;
