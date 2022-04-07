import Footer from "../../components/footer";
import NavBar from "../../components/navBar";
import GiantSearchBar from "../atomic/giantSearchBar";
import {store} from "../../Redux/store"
import {useNavigate} from "react-router-dom"

function CustomerHome() {
    let navigate = useNavigate();

    const navOnClick = () => {
        if(store.getState().GlobalState.value.userType=="customer")
        {
            navigate("/search");
        }
    };


    return (
        <div className="bg-dark full-div">
            <NavBar searchBar={false} userType="customer"/>
            <GiantSearchBar  onClick={navOnClick}/>
            <Footer />
        </div>
    );
}
export default CustomerHome;