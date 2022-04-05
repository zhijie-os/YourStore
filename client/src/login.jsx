import Footer from "./components/footer";
import NavBar from "./components/navBar";

function Login() {

    return (
        <div>
            <NavBar />
            <section className="pt-3 d-flex justify-content-center">
                <div className="card my-5" style="width: 35rem;">
                    <form className="card-body p-lg-5">
                        <div className="text-center">
                            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                width="200px" alt="profile" />
                        </div>

                        <div className="mb-3">
                            <input type="text" className="form-control" id="Username" aria-describedby="emailHelp"
                                placeholder="User Name" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" placeholder="password" />
                        </div>
                        <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
                        <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not Registered?
                            <a href="#" className="text-dark fw-bold"> Create anAccount</a>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );

}

export default Login;