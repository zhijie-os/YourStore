// import SearchBar from './components/searchBar.jsx'
import NavBar from './components/navBar.jsx'
import Footer from './components/footer.jsx';
import ProductSearchResult from './customer/complex/SearchResult.jsx';
import CustomerHome from './customer/pages/customerHome.jsx';
import Login from './login.jsx';


function App() {
  return (
    <div className="App d-flex flex-column min-vh-100" >
      {/* <NavBar userType="customer" /> */}

      <Login/>
      {/* <CustomerHome/> */}

      {/* <Footer/> */}
    </div>
  );
}

export default App;
