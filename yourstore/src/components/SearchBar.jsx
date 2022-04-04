import React from "react";
import {Dropdown, Container, Form, FormControl, Button} from 'react-bootstrap';

const SearchBar = () =>{
    return(
        <Container className="d-flex p-5 justify-content-around">
                <Form className="d-flex" style={{ width:'30rem'}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg">
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
        </Container> 
    );
};
export default SearchBar;