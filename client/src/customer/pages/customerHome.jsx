import NavBar from "../../components/navBar";
import SearchResult from "../complex/SearchResult";

function CustomerHome() {
    return (
        <div>
            <NavBar userType="customer" />
            <SearchResult />
        </div>
    );
}
export default CustomerHome;