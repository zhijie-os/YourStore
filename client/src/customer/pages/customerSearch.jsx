import SearchResult from "../complex/searchResult";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
function CustomerSearch(props) {
    return (
    <div>
         <NavBar searchBar={true} userType="customer" />
         <SearchResult />
         <Footer />
    </div>
    
    );
}

export default CustomerSearch;