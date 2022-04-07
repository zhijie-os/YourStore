
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
                        <div style="width: 50px;" className="me-3">
                            <input min="0" name="quantity" value="1"
                                type="number" className="form-control form-control-sm" />
                        </div>
                        <div>
                            <h5 className="mb-0">${props.product.Price}</h5>
                        </div>
                    </div>
                    <div onclick={props.delete}><i className="bi bi-trash"></i></div>
                </div>
            </div>
        </div>
    );
}

export default CartProductCard