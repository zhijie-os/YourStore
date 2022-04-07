
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import {store} from "../../Redux/store"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import {useState, useEffect} from  "react";
import CartProductCard from "../atomic/cartProductCard";

function CustomerCart(props) {

    let navigate = useNavigate();
    const navOnClick = () => {
        console.log(store.getState().GlobalState.value.userType);
        if(store.getState().GlobalState.value.userType=="customer")
        {
            navigate("/search");
        }
    };

    const [rerender, setRerender] = useState(false);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8888/customers/"+ 
        store.getState().
        GlobalState.value.userID+"/cart").then(
            (res)=>{
                console.log(res.data);
                setLoaded(false);
                setProducts(res.data.products);
                setTotal(res.data.total);
                setLoaded(true);
            }
        );
    },[rerender]);

    const deleteFromCart = ()=>{
        axios.get("")
    };


    return (
        <div>
            <NavBar searchBar={true} userType="customer" onClick={navOnClick}/>
            
            <section class="m-2 pt-3">
                <div class="container p-2">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col">
                            <div class="card">
                                <div class="card-body p-4">

                                    <div class="row">
                                        <div class="col-lg-7">
                                            {loaded && products.map(product=><CartProductCard key={product._id} product={product}/>)}
                                        </div>

                                        <div class="col-lg-5">
                                            <div class="card bg-secondary text-white rounded-3">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                                        <h2 class="mb-0">Receiver Details</h2>
                                                    </div>

                                                    <hr class="my-4" />

                                                    <form class="mt-4">
                                                        <div class="form-outline form-white mb-4">
                                                            <label class="form-label" for="typeName">Receiver Name</label>
                                                            <input type="text" id="typeName"
                                                                class="form-control form-control-lg" placeholder="Joe Doe" />
                                                        </div>

                                                        <div class="form-outline form-white mb-4">
                                                            <label class="form-label" for="typeText">Receiver Address</label>
                                                            <input type="text" id="typeText"
                                                                class="form-control form-control-lg"
                                                                placeholder="3272 24 Ave Nw" />
                                                        </div>
                                                    </form>

                                                    <hr class="my-4" />

                                                    <div class="d-flex justify-content-between mb-4">
                                                        <p class="mb-2">Total</p>
                                                        <p class="mb-2">${loaded && total}</p>
                                                    </div>


                                                    <button type="button" class="col-md-12 btn btn-dark">Purchase</button>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>



            <Footer />



        </div>

    );
}

export default CustomerCart;