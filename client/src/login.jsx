
import Footer from "./components/footer";
import NavBar from "./components/navBar";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import {
    login
} from './Redux/globalStateSlice';

import { store } from './Redux/store'

function Login(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();


    // local states, username and password: Javascript is case sensitive
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // try login
    const loginAtemp = (e) => {
        // prevent page refresh
        e.preventDefault();

        // axios put
        axios.put("http://127.0.0.1:8888/login",    // UserName and Password in the body
            { "UserName": userName, "Password": password }).then(res => {
                // trigger the "login" reducer in the global state
                // set th userID and userType in the global state
                dispatch(login({ userID: res.data.UserName, userType: res.data.UserType }));
                // check which type the user is
                if (store.getState().GlobalState.value.userType == "customer") {
                    // navigate to page /home
                    navigate("/home");
                }
                else {
                    // navigate to page /inventory if it is seller
                    navigate("/login");
                }
            }).catch((err) => {
                // otherwise, alert user that the error message
                alert(err.response.data.message);
            });
    }

    return (
        <div>
            <NavBar />
            <section className="pt-3 d-flex justify-content-center">
                <div className="card my-5">
                    <form onSubmit={loginAtemp} className="card-body p-lg-5" >
                        <div className="text-center">
                            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                width="200px" alt="profile" />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="Username" placeholder="User Name"
                                value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control"
                                id="password" placeholder="password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
                        <div className="form-text text-center mb-5 text-dark">Not Registered?
                            <a href="#" className="text-dark fw-bold"> Create an Account</a>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );

}

export default Login;