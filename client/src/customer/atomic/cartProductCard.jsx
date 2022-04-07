
function CartProductCard(props) {
    return (
        <div className="card mb-3 mb-lg-0">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row  align-items-center">
                        <div>
                            <h2>Image Placeholder</h2>
                        </div>
                        <div class="ms-3">
                            <h5>{props.product.Title}</h5>
                            <p className="small mb-0">{props.product.Description}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <h5 className="mb-0">${props.product.Price}</h5>
                        </div>
                    </div>
                    <div><i className="bi bi-trash"></i></div>
                </div>
            </div>
        </div>
    );
}

export default CartProductCard