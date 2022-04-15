
import SearchProductCard from '../atomic/searchProductCard';
import Pagination from '../../components/pagination';
import { store } from '../../Redux/store'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { enterSearchKey, selectCategory } from '../../Redux/globalStateSlice';

function SearchResult(props) {

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);

    const getGSValue = () => {
        return store.getState().GlobalState.value;
    }

    const retrieveProducts = () => {
        // console.log(getGSValue().category);
        axios.get("http://127.0.0.1:8888/products?"
            + "&searchKey=" + (getGSValue().key == "" ? "null" : getGSValue().key) +
            "&category=" + (getGSValue().category == "All" ||
                getGSValue().category == null ? "null" : getGSValue().category),
            {
                headers: {
                    'Authorization': "Bearer " + store.getState().GlobalState.value.token
                }
            })
            .then(res => {
                setLoaded(false);
                setProducts(res.data);
                console.log(res.data);
                setLoaded(true);


            }).catch(err => console.log(err.response.data));
    }



    useEffect(() => {
        retrieveProducts();
    }, [page])

    function changePage(dest) {
        setPage(dest);
    }

    return (
        <div>
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
                                                    <SearchProductCard key={product._id} product={product} />
                                                )
                                            }

                                        </div></div></div></div></div></div>
                </div>
            </section>
            <Pagination pageNumber={page} onClick={changePage} />
        </div>


    );
}

export default SearchResult;