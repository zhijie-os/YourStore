
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from "react";
import { store } from '../Redux/store';

import axios from "axios";

function AdminProducts(props) {

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/admins/products").
            then((res) => {
                setLoaded(false);
                console.log(res.data);
                setProducts(res.data);
                setLoaded(true);
            }).catch(err => console.log(err.resposne.message));
    }, [rerender]);

    const deleteProduct = (productID) => () => {
        console.log("http://127.0.0.1:8888/products/"+productID);
        axios.delete("http://127.0.0.1:8888/products/"+productID).then(()=>{
            alert("Product with ID " + productID + " has been successfully remvoed....")
            setRerender(!rerender);
        }).catch(err => console.log(err.response));
    };


    
    const [show, setShow] = useState(false);
    const [category,setCategory] = useState();

    const createCategory = () =>{
        axios.post("http://127.0.0.1:8888/admins/createCategory",{"Title":category},{
            headers: {
                'Authorization': "Bearer "+store.getState().GlobalState.value.token
            }}).then(()=>{
            alert("Category "+category + " has created");
        }).catch(err=>alert(err.response.message));
    }

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setCategory(null);
        setShow(true);
    };


    return (
        <div>
            <NavBar userType="admin" />

            <div>

                <section className="p-1">
                    <div className="container">
                        <button className="btn btn-primary btn-lg" onClick={handleShow}>Create New Category</button>
                    </div>
                </section>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    placeholder="eg: Cars"
                                    autoFocus
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={createCategory}>
                            Create Category
                        </Button>
                    </Modal.Footer>
                </Modal>





                <div className="container p-5">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Title</th>
                                <th>Seller</th>
                                <th>Inventory</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loaded && products.map(product => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.SellerID}</td>
                                        <td>{product.Title}</td>
                                        <td>{product.Inventory}</td>
                                        <td>{product.Description}</td>
                                        <td>{product.Price}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={deleteProduct(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>



            <Footer />
        </div>

    );
}

export default AdminProducts;