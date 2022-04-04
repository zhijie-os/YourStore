import React from "react";
import { Navbar, Nav, Container, NavItem, NavDropdown,Form, FormControl, Button, Card} from 'react-bootstrap';

const Footer = () =>{
    return(
        <div className= "bg-dark p-5 text-white text-center" style={{position: "fixed", left: 0, bottom: 0,right: 0}}>
            <p className="lead">Copyright &copy;YourStore</p>
        </div>  
    );
};
export default Footer;