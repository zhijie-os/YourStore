import React from "react";
import NavUser from "../components/NavUser";
import Footer from "../components/Footer";
import { Dropdown, Navbar, Nav, Container, NavItem, NavDropdown,Form, FormControl, Button, Card} from 'react-bootstrap';


const SearchResult = () => {
  return (
    <div>

        <NavUser/>

         <Container className="text-dark p-5 p-lg-3 pt-lg-5 ">
            <div className="d-flex justify-content-center">
                <h1>Happy Shopping at<span className="text-warning"> YourStore</span></h1>
                
            </div>
        </Container>
        
        <Footer/>
    </div>
    
  );
};

export default SearchResult;