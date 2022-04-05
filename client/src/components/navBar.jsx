import React, {useState, useEffect} from 'react';
import SearchBar from './searchBar';


function NavBar(props) {

    const [userType, setUserType] = useState(null);

    
    useEffect(()=>{
        setUserType(props.userType);
    },[]);

    return (
        <nav className="navbar bg-dark navbar-expand-lg  p-3 fixed-top">
            <div className="container">
                <a href="#" className="navbar-brand text-white">YourStore</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {userType==="customer" && <SearchBar/>}

                <div className="collapse navbar-collapse " id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {userType==="seller" && <a href="#myproducts" className="nav-link text-white">My Products</a>}
                            {userType==="customer" && <a href="#mycart" className="nav-link text-white">My Cart</a>}
                        </li>
                        <li className="nav-item">
                            {userType && <a href="#myorders" className="nav-link text-white">My Orders</a>}
                        </li>
                        <li className="nav-item">
                            {/* {login && <a href="#logout" className="nav-link text-white">Logout</a>} */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>);
};


export default NavBar;