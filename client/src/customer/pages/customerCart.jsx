

function CustomerCart(props) {
    return (
        <section class="m-2 pt-3">
        <div class="container p-2">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col">
                    <div class="card">
                        <div class="card-body p-4">

                            <div class="row">
                                <div class="col-lg-7">

                                    <div class="card mb-3 mb-lg-0">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row  align-items-center">
                                                    <div>
                                                        <img src="Images/T-ShirtWhite.jpg"
                                                            class="img-fluid rounded-3"
                                                            style="width: 65px;"/>
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>White T-Shirt</h5>
                                                        <p class="small mb-0">Just a regular White T-Shirt</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div style="width: 50px;" class="me-3">
                                                        <input min="0" name="quantity" value="1"
                                                            type="number" class="form-control form-control-sm" />
                                                    </div>
                                                    <div>
                                                        <h5 class="mb-0">$99.99</h5>
                                                    </div>
                                                </div>
                                                <div onclick=""><i class="bi bi-trash"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-lg-5">
                                    <div class="card bg-secondary text-white rounded-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <h2 class="mb-0">Receiver Details</h2>
                                            </div>

                                            <hr class="my-4"/>

                                            <form class="mt-4">
                                                <div class="form-outline form-white mb-4">
                                                    <label class="form-label" for="typeName">Receiver Name</label>
                                                    <input type="text" id="typeName"
                                                        class="form-control form-control-lg" placeholder="Joe Doe" />
                                                </div>

                                                <div class="form-outline form-white mb-4">
                                                    <label class="form-label" for="typeText">Receiver Address</label>
                                                    <input type="text" id="typeText"
                                                        class="form-control form-control-lg"
                                                        placeholder="3272 24 Ave Nw" />
                                                </div>
                                            </form>

                                            <hr class="my-4"/>

                                            <div class="d-flex justify-content-between mb-4">
                                                <p class="mb-2">Total</p>
                                                <p class="mb-2">$4818.00</p>
                                            </div>


                                            <button type="button" class="col-md-12 btn btn-dark">Purchase</button>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>


    );
}

export default CustomerCart;