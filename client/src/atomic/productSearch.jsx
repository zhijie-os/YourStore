import React, { useState, useEffect } from 'react';
import axios from "axios";


function ProductSearchResult(props) {
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8888/products?pageSize="+props.pageSize+"&pageNumber=" + props.pageNumber)
            .then(res => {
                setProducts(res.data);
                setLoaded(true);
            })
    }, [])

    return (
        <section className="m-2 pt-3">
            <div className="container p-2">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col">
                                        {
                                            loaded
                                            &&
                                            products.map(product =>

                                                <div className="card mb-3 mb-lg-0">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex  align-items-center">
                                                                <div>
                                                                    <h5>Image Placeholder</h5>
                                                                    {/* <img src="Images/T-ShirtWhite.jpg" className="img-fluid rounded-3"
                                                                        style="width: 65px;" /> */}
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{product.Title}</h5>
                                                                    <p className="small mb-0">{product.Description}</p>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row align-items-center">
                                                                <div className="d-flex flex-row align-items-center me-4">
                                                                    <div>
                                                                        <h5 className="mb-0">${product.Price}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <button type="button" className="btn btn-secondary">Add to Cart</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }



                                    </div></div></div></div></div></div>
            </div>


        </section>
    );
}

export default ProductSearchResult