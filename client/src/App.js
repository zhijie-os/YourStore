// import SearchBar from './components/searchBar.jsx'
import NavBar from './components/navBar.jsx'
import Footer from './components/footer.jsx';
import ProductSearchResult from './customer/complex/searchResult.jsx';
import CustomerHome from './customer/pages/customerHome.jsx';
import Login from './login.jsx';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useState } from 'react';
import { GlobalState } from './Redux/globalState.js';
import CustomerSearch from './customer/pages/customerSearch.jsx';

function App() {

  return (
    //<GlobalState/>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<CustomerHome />} />
          <Route exact path="/search" element={<CustomerSearch />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
