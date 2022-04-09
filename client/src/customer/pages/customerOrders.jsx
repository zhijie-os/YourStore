import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";

import {store} from '../../Redux/store'
import {useNavigate} from "react-router-dom"

function CustomerOrders(props) {
    let navigate = useNavigate();

    const navOnClick = () => {
        console.log(store.getState().GlobalState.value.userType);
        if (store.getState().GlobalState.value.userType == "customer") {
            navigate("/search");
        }
    };

    const [loaded, setLoaded] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{

    },[])


    return (
        <div>

            <NavBar searchBar={true} userType="customer" onClick={navOnClick} />


            <div className="container">
                <Table >
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Receiver Address</th>
                            <th>Receiver Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>
                                <button className="btn btn-danger">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <Footer />
        </div>
    );
}


export default CustomerOrders;

