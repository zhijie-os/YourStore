import SearchResult from "../complex/searchResult";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import {useState} from "react";

function SellerProducts(props) {

    return (
    <div>
         <NavBar userType="seller"/>
         <Footer />
    </div>
    
    );
}

export default SellerProducts;