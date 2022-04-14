
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

    const purchase = () =>{
        if(products.length==0)
        {
            alert("You do not have any products to purchase ...");
            return;
        }

        if(name&&address)
        {
            let info={
                ReceiverName: name,
                ReceiverAddress: address,
                Products: products
            };
            axios.put("http://127.0.0.1:8888/customers/"+
            store.getState().GlobalState.value.userID+"/createOrder",
            info).then((res)=>{
                setRerender(!rerender);
                alert(res.data.message);
            }).catch(err=>console.log(err))
        }
        else
        {
            alert("Both Address and Name required...");
        }

    }


    const [rerender, setRerender] = useState(false);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);
    
    var key_id=0;

    useEffect(()=>{
        axios.get("http://127.0.0.1:8888/customers/"+ 
        store.getState().
        GlobalState.value.userID+"/cart").then(
            (res)=>{
                key_id=0;
                setLoaded(false);
                setProducts(res.data.products);
                setTotal(res.data.total);
                setLoaded(true);
            }
        );
    },[rerender]);

    const deleteFromCart = (product) => () =>{
        // console.log(product._id);
        axios.delete("http://127.0.0.1:8888/customers/"+ 
        store.getState().GlobalState.value.userID+"/cart",
        {data:{"ProductID":product._id}}).then(()=>{
            setRerender(!rerender);
            alert(product.Title + " has been successfully removed from the cart...")
        }).catch(err=>console.log(err));
    };


    return (
        <div>
            <NavBar searchBar={true} userType="customer" onClick={navOnClick}/>
            
            <section className="m-2 pt-3">
                <div className="container p-2">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">

                                    <div className="row">
                                        <div className="col-lg-7">
                                            {loaded && products.map(product=>{
                                            key_id++;
                                            return(<CartProductCard key={key_id}
                                            product={product} deleteFromCart={deleteFromCart} />);})}
                                        </div>

                                        <div className="col-lg-5">
                                            <div className="card bg-secondary text-white rounded-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h2 className="mb-0">Receiver Details</h2>
                                                    </div>

                                                    <hr className="my-4" />

                                                    <form className="mt-4">
                                                        <div className="form-outline form-white mb-4">
                                                            <label className="form-label" htmlFor="typeName">Receiver Name</label>
                                                            <input type="text" id="typeName"
                                                                className="form-control form-control-lg" 
                                                                placeholder="eg: Joe Doe" 
                                                                onChange={(e) => setName(e.target.value)} />
                                                        </div>

                                                        <div className="form-outline form-white mb-4">
                                                            <label className="form-label" htmlFor="typeText">Receiver Address</label>
                                                            <input type="text" id="typeText"
                                                                className="form-control form-control-lg"
                                                                placeholder="eg: 3272 24 Ave Nw" 
                                                                onChange={(e) => setAddress(e.target.value)} />
                                                        </div>
                                                    </form>

                                                    <hr className="my-4" />

                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total</p>
                                                        <p className="mb-2">${loaded && total}</p>
                                                    </div>


                                                    <button type="button" className="col-md-12 btn btn-dark" onClick={purchase}>Purchase</button>

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