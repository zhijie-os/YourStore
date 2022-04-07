import SearchResult from "../complex/searchResult";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import {useState} from "react";

function CustomerSearch(props) {

    const [searchTrigger, setSeachTrigger] = useState(false);
    
    const trigger = ()=>{
        setSeachTrigger(!searchTrigger);
    }

    return (
    <div>
         <NavBar searchBar={true} userType="customer" onClick={trigger}/>
         <SearchResult key={searchTrigger}/>
         <Footer />
    </div>
    
    );
}

export default CustomerSearch;