import Footer from "../../components/footer";
import NavBar from "../../components/navBar";
import GiantSearchBar from "../atomic/giantSearchBar";

function CustomerHome() {

    return (
        <div className="bg-dark full-div">
            <NavBar searchBar={false} userType="customer"/>
            <GiantSearchBar/>
            <Footer/>
        </div>
    );
}
export default CustomerHome;