import React, {useState, useEffect} from 'react';
import axios from "axios";


function SearchResult(props){
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
          axios.get("http://127.0.0.1:8888/products?pageSize=10&pageNumber="+page)
          .then(res => 
            {
                console.log(res.data);
                setAll(res.data);
                setLoaded(true);
            })
      }, [])

    return (
        <section class="m-2 pt-3">
        <div class="container p-2">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="row">
                                <div class="col">

                                    {/* <div class="card mb-3 mb-lg-0">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row  align-items-center">
                                                    <div>
                                                        <img src="Images/T-ShirtWhite.jpg" class="img-fluid rounded-3"
                                                            style="width: 65px;" />
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>White T-Shirt</h5>
                                                        <p class="small mb-0">Just a regular White T-Shirt</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <h5 class="mb-0">$99.99</h5>
                                                    </div>
                                                </div>
                                                <div onclick="" class="d-flex flex-row align-items-center">
                                                    <button type="button" class="btn btn-secondary">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    
                                    
                                    </div></div></div></div></div></div></div>
    </section>
    );
}

export default SearchResult