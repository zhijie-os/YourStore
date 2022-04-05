// import SearchBar from './components/searchBar.jsx'
import NavBar from './components/navBar.jsx'
import Footer from './components/footer.jsx';
import ProductSearchResult from './customer/complex/SearchResult.jsx';
import CustomerHome from './customer/pages/customerHome.jsx';
import Login from './login.jsx';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserTypeContext } from './context'
import { useState } from 'react';

function App() {

  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <UserTypeContext.Provider value={{userType, setUserType}}>
        <div className="App d-flex flex-column min-vh-100" >
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserTypeContext.Provider>
    </Router >

  );
}

export default App;
