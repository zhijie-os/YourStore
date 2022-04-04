import React from "react";
import { Dropdown, Navbar, Nav, Container, NavItem, NavDropdown,Form, FormControl, Button, Card} from 'react-bootstrap';
import SearchBar from "./SearchBar";

const NavUser = () =>{
    return(
        <Navbar className="p-1 d-flex align-items-center justify-content-evenly" bg="dark" expand="lg" variant={"dark"}>
            
            <Navbar.Brand href="#home">YourStore</Navbar.Brand>
            
            <Form className="p-0 d-flex align-items-center justify-content-around">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="md">
                        All
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="secondary">Search</Button>
            </Form>    
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="#cart" >My Cart</Nav.Link>
                    <Nav.Link href="#order">My Order</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            
        </Navbar>
    );
};
export default NavUser;