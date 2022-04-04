import SearchBar from './atomic/searchBar.jsx'
import NavBar from './atomic/navBar.jsx'
import Footer from './atomic/footer.jsx';
import SearchResult from './atomic/productSearch.jsx';
import SearchWithPagination from './complex/searchWithPagination.jsx';


function App() {
  return (
    <div className="App d-flex flex-column min-vh-100" >
      <NavBar userType="customer" />

      <SearchWithPagination searchType="Products"/>

      <Footer/>
    </div>
  );
}

export default App;
