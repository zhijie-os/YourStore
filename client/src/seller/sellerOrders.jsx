import NavBar from "../components/navBar";
import Footer from "../components/footer";

import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";

import { store } from '../Redux/store'
import { useNavigate } from "react-router-dom"

import axios from "axios";


function SellerOrders(props) {
    // let navigate = useNavigate();




    return (
        <div>
            <NavBar searchBar={false} userType="seller" />

            {/* <div className="container">
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
                                    <td>{order.SellerID}</td>
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
            </div> */}

            <Footer />
        </div>
    );
}


export default SellerOrders;

