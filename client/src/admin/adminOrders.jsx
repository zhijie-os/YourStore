import NavBar from "../components/navBar";
import Footer from "../components/footer";

import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";

import { store } from '../Redux/store'
import { useNavigate } from "react-router-dom"

import axios from "axios";




function AdminOrders(props){


    // let navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [rerender, setRerender] = useState(false);


    const cancelOrder = (orderNumber) => () => {
        // console.log(product._id);
        axios.patch("http://127.0.0.1:8888/orders/" + orderNumber,
            { "Cancelled": "true" }).then(() => {
                setRerender(!rerender);
                alert("Order with ID: " + orderNumber + " has been successfully cancelled...")
            }).catch(err => console.log(err));
    };


    useEffect(() => {
        axios.get("http://127.0.0.1:8888/orders").then((res) => {
                setLoaded(false);
                console.log(res.data);
                setOrders(res.data);
                setLoaded(true);
            }).catch(err => console.log(err));
    }, [rerender]);


    return (
        <div>
            <NavBar searchBar={false} userType="admin" />

            <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Customer ID</th>
                            <th>Seller ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Receiver Address</th>
                            <th>Receiver Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded && orders.map(order => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.CustomerID}</td>
                                    <td>{order.SellerID}</td>
                                    <td>{order.Product}</td>
                                    <td>{order.Total}</td>
                                    <td>{order.ReceiverName}</td>
                                    <td>{order.ReceiverAddress}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={cancelOrder(order._id)}>Cancel</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <Footer />
        </div>
    );
}


export default AdminOrders;