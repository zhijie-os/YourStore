
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from "react";
import { store } from '../Redux/store';

import axios from "axios";

function SellerProducts(props) {

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/sellers/" +
            store.getState().GlobalState.value.userID +
            "/products").then((res) => {
                setLoaded(false);
                console.log(res.data.Products);
                setProducts(res.data.Products);
                setLoaded(true);
            }).catch(err => console.log(err));

    }, [rerender]);




    const [show, setShow] = useState(false);
    const [newProductTitle, setNewProductTitle] = useState();
    const [newProductPrice, setNewProductPrice] = useState();
    const [newProductDescription, setNewProductDescription] = useState();
    const [newSearchTags, setNewSearchTags] = useState();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();


    const handleClose = () => {
        setShow(false);
    };



    const handleShow = () => {
        setNewProductDescription(null);
        setNewProductPrice(null);
        setNewProductTitle(null);
        setNewSearchTags(null);
        setCategory(null);
        setShow(true);
    };

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/categories")
            .then(res => {
                // set the allCategories
                setCategories(res.data);
            }).catch(err => console.log(err));
    }, [])




    const deleteProduct = (productID) => () => {
        console.log("http://127.0.0.1:8888/products/"+productID);
        axios.delete("http://127.0.0.1:8888/products/"+productID).then(()=>{
            alert("Product with ID " + productID + " has been successfully remvoed....")
            setRerender(!rerender);
        }).catch(err => console.log(err.response));
    };


    const addNewProduct = () => {
        if (!newProductTitle||!newProductPrice||!category||!newProductDescription)
        {
            alert("Fields cannot be left empty...");
        }
        else if (isNaN(newProductPrice)& Number(newProductPrice) > 0) {
            alert("Price field is not a number...");
        }
        else {
            
            // array
            let tags = newSearchTags.split(",").map(tag=>tag.trim());
            console.log(tags);

            axios.post("http://127.0.0.1:8888/products",
            {
                "SellerID": store.getState().GlobalState.value.userID ,
                "Title": newProductTitle,
                "Price": newProductPrice,
                "Description": newProductDescription,
                "SearchKeys": tags,
                "Category":category
            }).then(()=>{
                alert("Product has been successfully created...");
                setRerender(!rerender);
            }).catch(err=>console.log(err));

            handleClose();   
        }
    };

    return (
        <div>
            <NavBar userType="seller" />

            <div>

                <section className="p-1">
                    <div className="container">
                        <button className="btn btn-primary btn-lg" onClick={handleShow}>Add New Product</button>
                    </div>
                </section>




                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Title</Form.Label>
                                <Form.Control
                                    placeholder="eg: iPhone"
                                    autoFocus
                                    onChange={e => setNewProductTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    placeholder="eg: 1999.99 (no dollar sign please)"
                                    autoFocus
                                    onChange={e => setNewProductPrice(e.target.value)}
                                />
                            </Form.Group>



                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option>Please select the category</option>
                                    {categories.length > 0 && categories.map(cate => <option key={cate._id} value={cate.Title}>{cate.Title}</option>)}
                                </Form.Control>
                            </Form.Group>




                            <Form.Group className="mb-3">
                                <Form.Label>Search Tags</Form.Label>
                                <Form.Control
                                    placeholder='eg: ios, Apple, Phone 
                                    (seperate each tag by ",")'
                                    autoFocus
                                    onChange={e => setNewSearchTags(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control as="textarea" rows={2}
                                    placeholder="eg: iPhone designed by Apple at California."
                                    onChange={e => setNewProductDescription(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={addNewProduct}>
                            Save Products
                        </Button>
                    </Modal.Footer>
                </Modal>





                <div className="container p-5">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loaded && products.map(product => {
                                return (
                                    <tr key={product.ProductNumber}>
                                        <td>{product.ProductNumber}</td>
                                        <td>{product.ProductTitle}</td>
                                        <td>{product.Description}</td>
                                        <td>{product.Price}</td>
                                        <td>
                                            <button className="btn btn-primary">Update</button>
                                            <button className="btn btn-danger" onClick={deleteProduct(product.ProductNumber)}>Delete</button>
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

export default SellerProducts;