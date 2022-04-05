import React, { useState, useEffect } from 'react';
import axios from "axios";
import SearchProductCard from '../atomic/searchProductCard';
import Pagination from '../../components/pagination';

function SearchResult(props) {
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);


    useEffect(() => {
        axios.get("http://127.0.0.1:8888/products?pageSize=10" + "&pageNumber=" + page)
            .then(res => {
                setProducts(res.data);
                setLoaded(true);
            })
    }, [page])

    function changePage(dest)
    {
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
                                                    <SearchProductCard product={product}/>
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