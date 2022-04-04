import Pagination from "../atomic/pagination";
import ProductSearchResult from "../atomic/productSearch";
import {useState, useEffect, useReducer} from 'react';

function SearchWithPagination(props) {

    const [page,setPage]=useState(0);

    function changePage(destPage){
        setPage(destPage);
    };

    const forceUpdate = useReducer(bool => !bool)[1];

    useEffect(()=>
    {
        forceUpdate();
    },[page]);

    return (
        <div>
            {props.searchType==="Products" && <ProductSearchResult key={page} pageSize={10} pageNumber={page}/> }
            <Pagination pageNumber={page} onClick={changePage}/>
        </div>
    );
};


export default SearchWithPagination;