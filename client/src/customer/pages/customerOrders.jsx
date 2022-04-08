import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function CustomerOrders(props) {


    const navOnClick = () => {
        console.log(store.getState().GlobalState.value.userType);
        if (store.getState().GlobalState.value.userType == "customer") {
            navigate("/search");
        }
    };


    return (
        <div>

            <NavBar searchBar={true} userType="customer" onClick={navOnClick} />

            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thread>
                                    <tr>
                                        <th>Product Name</th>
                                    </tr>
                                </thread>
                                <tbody className="align-middle text-center">
                                    <tr>
                                        <td>80808080</td>
                                        <td>Random Customer</td>
                                        <td>$99.99</td>
                                        <td>Dummy Receiver</td>
                                        <td>3272 24 Ave NW</td>
                                        <td>Shipped</td>
                                        <td>
                                            <button className="btn btn-secondary">Detail</button>
                                            <button className="btn btn-primary">Ship</button>
                                            <button className="btn btn-danger">Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


            <Footer/>
        </div>
    );
}


export default CustomerOrders;

