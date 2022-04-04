import React from "react";
import Footer from "../components/Footer";
import { Dropdown, Navbar, Nav, Container, NavItem, NavDropdown,Form, FormControl, Button, Card} from 'react-bootstrap';


const Login = () => {
  return (
    <div>
        <Navbar className="navbar-dark p-4" bg="dark" expand="lg" variant={"dark"}>
           <Navbar.Brand href="#home">YourStore</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>

        <Container className="d-flex justify-content-center" style={{ width:'40rem'}}>
            <Form id="Login-form" className="text-center p-3 w-100">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile"></img>
                <Form.Group>
                <Form.Control size="lg" placeholder="User Name" className="position-relative my-3" />
                </Form.Group>
                <Form.Group>
                <Form.Control size="lg" placeholder="Password" className="position-relative my-3" />
                </Form.Group>
                <div className="d-grid">
                <Button variant="secondary" size="lg">Log in</Button>
                </div>
                <div className="form-text text-center m-5 text-dark">Not Registered? 
                <a href="#" className="text-dark fw-bold"> Create anAccount</a>
                </div>
                
            </Form>
        </Container>
        
        <Footer/>
    </div>
    
  );
};

export default Login;