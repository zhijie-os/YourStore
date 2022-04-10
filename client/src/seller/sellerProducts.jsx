
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Table from 'react-bootstrap/Table'

import { useState, useEffect} from "react";
import {store} from '../Redux/store';

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


    return (
        <div>
            <NavBar userType="seller" />

            <div>

                <section className="p-1">
                    <div className="container">
                        <button className="btn btn-primary btn-lg">Add New Product</button>
                    </div>
                </section>



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
                                            <button className="btn btn-danger">Delete</button>
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