

function SearchProductCard(props) {
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
                            <button type="button" className="btn btn-secondary">Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default SearchProductCard;