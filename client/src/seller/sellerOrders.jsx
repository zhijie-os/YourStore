import NavBar from "../components/navBar";
import Footer from "../components/footer";

import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";

import { store } from '../Redux/store'
import { useNavigate } from "react-router-dom"

import axios from "axios";


function SellerOrders(props) {
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


    const cancelledAlert = () => {
        alert("The order is already be cancelled.");
    };

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/sellers/" +
            store.getState().GlobalState.value.userID +
            "/orders").then((res) => {
                setLoaded(false);
                console.log(res.data.Orders);
                setOrders(res.data.Orders);
                setLoaded(true);
            }).catch(err => console.log(err));
    }, [rerender]);


    return (
        <div>
            <NavBar searchBar={false} userType="seller" />

            <div className="container">
                <Table >
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Customer ID</th>
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
                                    <td>{order.CustomerID}</td>
                                    <td>{order.ProductName}</td>
                                    <td>{order.Price}</td>
                                    <td>{order.ReceiverName}</td>
                                    <td>{order.ReceiverAddress}</td>
                                    <td>{order.Status}</td>
                                    <td>{order.ShipmentLabel}</td>
                                    <td>
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


export default SellerOrders;

