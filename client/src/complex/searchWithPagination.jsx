import Pagination from "../atomic/pagination";
import ProductSearchResult from "../atomic/productSearch";
import {useState, useEffect} from 'react';

function SearchWithPagination(props) {

    const [page,setPage]=useState(0);
    const [rerender, setRerender] = useState(false);

    function changePage(destPage){
        setPage(destPage);
    };

    useEffect(()=>
    {
        console.log("here");
        setRerender(!rerender);
    },[page]);

    return (
        <div>
            {props.searchType==="Products" && <ProductSearchResult pageSize={10} pageNumber={page}/>}
            <Pagination pageNumber={page} onClick={changePage}/>
        </div>
    );
};


export default SearchWithPagination;