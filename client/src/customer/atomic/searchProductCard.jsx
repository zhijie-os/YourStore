import { store } from '../../Redux/store'
import React, { useState, useEffect } from 'react';
import axios from "axios";

function SearchProductCard(props) {

    const addToCart = () => {
        axios.patch("http://127.0.0.1:8888/customers/"+ 
        store.getState().GlobalState.value.userID+"/cart",
        { data:{"ProductID":props.product._id}}).then(
            ()=>alert(props.product.Title+" has been successfully added into the cart...")
        );
    };



    return (
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
                            <h5>{props.product.Title}</h5>
                            <p className="small mb-0">{props.product.Description}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-row align-items-center me-4">
                            <div>
                                <h5 className="mb-0">${props.product.Price}</h5>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <button type="button" className="btn btn-secondary" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default SearchProductCard;