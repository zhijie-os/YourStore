import SearchBar from './components/searchbar.jsx'
import NavBar from './components/navbar.jsx'
import Footer from './components/footer.jsx';
import SearchResult from './components/searchresult.jsx';


function App() {
  return (
    <div className="App d-flex flex-column min-vh-100" >
      <NavBar userType="customer" />

      <SearchResult/>

      
      <Footer />
    </div>
  );
}

export default App;
