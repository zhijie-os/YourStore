
import Footer from "./components/footer";
import NavBar from "./components/navBar";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {
    login
} from './Redux/globalStateSlice';

import { store } from './Redux/store'

function Login(props) {
    let navigate = useNavigate();

    // for redux
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
                dispatch(login({ userID: res.data.UserName, userType: res.data.UserType, token:res.data.Token}));
                // check which type the user is
                if (store.getState().GlobalState.value.userType == "customer") {
                    // navigate to page /home
                    navigate("/home");
                }
                else if (store.getState().GlobalState.value.userType == "seller") {
                    // navigate to page /inventory if it is seller
                    navigate("/seller/products");
                }
                else {
                    navigate("/admin/products");
                }
            }).catch((err) => {
                // otherwise, alert user that the error message
                alert(err.response.data.message);
            });
    }


    const [signupUserName, setSignupUserName] = useState();
    const [signupPassword, setSignupPassword] = useState();
    const [signupUserType, setSignupUserType] = useState();
    const [signup, setSignup] = useState(false);


    const signupShow = () => {
        setSignupUserName(null);
        setSignupPassword(null);
        setSignupUserType(null);
        setSignup(true);
    }

    const signupClose = () => {
        setSignup(false);
    }

    const signupAttemp = () => {
        if (!signupUserName || !signupPassword || !signupUserType) {
            alert("All fields should be filled in order to create an user!")
        }
        else {
            let url = signupUserType == "customer" ? "/customers" : "/sellers"

            axios.post("http://127.0.0.1:8888" + url,    // UserName and Password in the body
                { "UserName": signupUserName, "Password": signupPassword }).then(() => {
                    alert("Success");
                }).catch((err) => {alert(err.response.data.message)});
            signupClose();
        }
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
                            <a href="#" className="text-dark fw-bold" onClick={signupShow}> Create an Account</a>
                        </div>
                    </form>
                </div>
            </section>



            <Modal show={signup} onHide={signupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="username" placeholder="User Name"
                                onChange={e => setSignupUserName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={e => setSignupPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={e => setSignupUserType(e.target.value)}
                            >
                                <option>User Type</option>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={signupClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={signupAttemp}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>








            <Footer />
        </div >
    );

}

export default Login;