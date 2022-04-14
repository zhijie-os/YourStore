import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { store } from '../Redux/store'
import {clean } from '../Redux/globalStateSlice'

function NavBar(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();


    const [userType, setUserType] = useState(null);


    useEffect(() => {
        setUserType(props.userType);
    }, []);

    const goToCart = () => {
        navigate("/cart");
    };

    const goToCustomerOrder = () => {
        navigate("/customer/orders");
    };


    const goToSellerProduct = () =>{
        navigate("/seller/products");
    }

    const goToSellerOrder = () => {
        navigate("/seller/orders");
    };

    const goAllProducts = () => {
        navigate("/admin/products");
    };

    const goAllOrders = () => {
        navigate("/admin/orders");
    };

    const logout = () => {
        dispatch(clean("Dummy"));
        navigate("/login");
    };


    return (
        <nav className="navbar bg-dark navbar-expand-lg  p-3 fixed-top">
            <div className="container">
                <a href="#" className="navbar-brand text-white">YourStore</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {props.searchBar && <SearchBar onClick={props.onClick} />}

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {userType === "seller" && <a href="#myproducts" className="nav-link text-white" onClick={goToSellerProduct}>My Products</a>}
                            {userType === "customer" && <a href="#mycart" className="nav-link text-white" onClick={goToCart}>My Cart</a>}
                            {userType === "admin" && <a href="#mycart" className="nav-link text-white" onClick={goAllProducts}>All Products</a>} 
                        </li>
                        <li className="nav-item">
                            {userType === "customer" && <a href="#myorders" className="nav-link text-white" onClick={goToCustomerOrder}>My Orders</a>}
                            {userType === "seller" && <a href="#myorders" className="nav-link text-white" onClick={goToSellerOrder}>My Orders</a>}
                            {userType === "admin" && <a href="#mycart" className="nav-link text-white" onClick={goAllOrders}>All Orders</a>}
                        </li>
                        <li className="nav-item">
                            <a href="#logout" className="nav-link text-white" onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>);
};


export default NavBar;