import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";

import { store } from '../../Redux/store'
import { useNavigate } from "react-router-dom"

import axios from "axios";


function CustomerOrders(props) {
    let navigate = useNavigate();

    const navOnClick = () => {
        if (store.getState().GlobalState.value.userType == "customer") {
            navigate("/search");
        }
    };

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
            }).catch(err => console.log(err));
    };


    const cancelledAlert = () => {
        alert("The order is already be cancelled.");
    };

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/customers/" +
            store.getState().GlobalState.value.userID +
            "/orders",{
                headers: {
                    'Authorization': "Bearer "+store.getState().GlobalState.value.token
                }}).then((res) => {
                setLoaded(false);
                console.log(res.data.Orders);
                setOrders(res.data.Orders);
                setLoaded(true);
            }).catch(err => console.log(err));
    }, [rerender]);

    const payOrder = (orderNumber) => () => {
        // console.log(product._id);
        axios.patch("http://127.0.0.1:8888/orders/" + orderNumber,
            { "Payment": "true" },{
                headers: {
                    'Authorization': "Bearer "+store.getState().GlobalState.value.token
                }}).then(() => {
                setRerender(!rerender);
                alert("Order with ID: " + orderNumber + " has been successfully being paid...")
            }).catch(err => alert(err.response.message));
    };

    return (
        <div>
            <NavBar searchBar={true} userType="customer" onClick={navOnClick} />

            <div className="container">
                <Table >
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Seller ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Receiver Address</th>
                            <th>Receiver Name</th>
                            <th>Status</th>
                            <th>Shipment Label</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded && orders.map(order => {
                            return (
                                <tr key={order.OrderNumber}>
                                    <td>{order.OrderNumber}</td>
                                    <td>{order.SellerID}</td>
                                    <td>{order.ProductName}</td>
                                    <td>{order.Price}</td>
                                    <td>{order.ReceiverName}</td>
                                    <td>{order.ReceiverAddress}</td>
                                    <td>{order.Status}</td>
                                    <td>{order.ShipmentLabel}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={payOrder(order.OrderNumber)}>Pay</button>
                                        <button className="btn btn-danger" onClick={order.Status === "Cancelled" ? cancelledAlert : cancelOrder(order.OrderNumber)}>Cancel</button>
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


export default CustomerOrders;

