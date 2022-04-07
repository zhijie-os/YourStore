import SearchBar from "../../components/searchBar";

function GiantSearchBar(props) {
    return (
        <div>
            <section className="text-light p-5 p-lg-3 pt-lg-5">
                <div className="d-flex justify-content-center">

                    <div className="d-flex flex-column">

                        <h1>Happy Shopping at<span className="text-warning"> YourStore</span>
                        </h1>
                    </div>
                </div>
            </section>

            <div className="d-flex p-5 justify-content-around">
                <SearchBar onClick={props.onClick}/>
            </div>
        </div>

    );
}

export default GiantSearchBar;