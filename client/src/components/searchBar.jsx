import React, {useState, useEffect} from 'react';
import axios from "axios";


function SearchBar(props){
    const [loaded, setLoaded] = useState(false);
    const [allCategories, setAll] = useState([]);

    useEffect(() => {
          axios.get("http://127.0.0.1:8888/categories")
          .then(res => 
            {
                //console.log(res.data);
                setAll(res.data);
                setLoaded(true);
            })
      }, [])

    return (
        <div className="input-group search-bar">
            <div className="dropdown input-group-prepend">
                <button className="btn btn-secondary dropdown-toggle btn-lg" type="button"
                    data-bs-toggle="dropdown">
                    All
                </button>
                <ul className="dropdown-menu">
                    {loaded && allCategories.map(category=><li  key={category.Title}><a className="dropdown-item" href="#">{category.Title}</a></li>)}
                </ul>
            </div>
            <input type="text" className="form-control" />
            <button className="input-group-append btn btn-secondary btn-lg" type="button">Search<i
                className="bi bi-search"></i></button>
        </div>
    );
}
export default SearchBar