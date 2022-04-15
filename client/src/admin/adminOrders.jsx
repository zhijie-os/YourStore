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
            { "Cancelled": "true" },{
                headers: {
                    'Authorization': "Bearer "+store.getState().GlobalState.value.token
                }}).then(() => {
                setRerender(!rerender);
                alert("Order with ID: " + orderNumber + " has been successfully cancelled...")
            }).catch(err => err.response.message);
    };


    useEffect(() => {
        axios.get("http://127.0.0.1:8888/admins/orders",{
            headers: {
                'Authorization': "Bearer "+store.getState().GlobalState.value.token
            }}).then((res) => {
                setLoaded(false);
                console.log(res.data.Orders);
                setOrders(res.data.Orders);
                setLoaded(true);
            }).catch(err => err.response.message);
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
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded && orders.map(order => {
                            console.log(order);
                            console.log(order.Order._id,order.Order.CustomerID,order.Order.SellerID,order.Product);
                            return (
                                <tr key={order.Order._id}>
                                    <td>{order.Order._id}</td>
                                    <td>{order.Order.CustomerID}</td>
                                    <td>{order.Order.SellerID}</td>
                                    <td>{order.Product.Title}</td>
                                    <td>{order.Order.Total}</td>
                                    <td>{order.Order.ReceiverName}</td>
                                    <td>{order.Order.ReceiverAddress}</td>
                                    <td>{order.Status}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={cancelOrder(order.Order._id)}>Cancel</button>
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