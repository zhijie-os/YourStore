import React from "react";
import Footer from "../components/Footer";
import { Dropdown, Navbar, Nav, Container, NavItem, NavDropdown,Form, FormControl, Button, Card} from 'react-bootstrap';
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="flex-column  justify-content-around min-vh-100 bg-dark">
        <Navbar className="navbar-dark p-4" bg="dark" expand="lg" variant={"dark"}>
           <Navbar.Brand href="#home">YourStore</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
               <Nav className="ml-auto">
                   <Nav.Link href="#cart">My Cart</Nav.Link>
                   <Nav.Link href="#order">My Cart</Nav.Link>
                   <Nav.Link href="#logout">Logout</Nav.Link>
               </Nav>
           </Navbar.Collapse>
        </Navbar>

        <Container className="text-light p-5 p-lg-3 pt-lg-5 ">
            <div className="d-flex justify-content-center">
                <h1>Happy Shopping at<span className="text-warning"> YourStore</span></h1>
                
            </div>
        </Container> 

        <SearchBar/>
        <Footer/>
    </div>
    
  );
};

export default Home;