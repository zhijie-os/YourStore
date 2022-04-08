import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';

import {
    enterSearchKey,
    selectCategory,
    selectGlobalState
} from '../Redux/globalStateSlice';

import { store } from '../Redux/store'

function SearchBar(props) {
 

    const [loaded, setLoaded] = useState(false);
    const [allCategories, setAll] = useState([]);

    // global state
    const gs = useSelector(selectGlobalState);

    const dispatch = useDispatch();


    // called only the first time loading
    useEffect(() => {
        // get the list of all categories
        axios.get("http://127.0.0.1:8888/categories")
            .then(res => {
                // set the allCategories
                setAll(res.data);
                // set loaded
                setLoaded(true);
            })
    }, [])


    // set selected category in the global state
    const setCategory = (category) => () => {
        dispatch(selectCategory(category));
    }

    // set the intending key in the search bar
    const setKey = (key) => {
        dispatch(enterSearchKey(key));
    }
    
    const clicked = () =>{
        alert("clicked");
    }


    return (
        <div className="input-group search-bar">
            <div className="dropdown input-group-prepend">
                <button className="btn btn-secondary dropdown-toggle btn-lg" type="button"
                    data-bs-toggle="dropdown">
                    {gs.category}
                </button>
                <ul className="dropdown-menu">
                    <li key="All" onClick={setCategory("All")}><a className="dropdown-item" href="#">All</a></li>
                    {loaded && allCategories.map(category => <li key={category.Title} onClick={setCategory(category.Title)}><a className="dropdown-item" href="#">{category.Title}</a></li>)}
                </ul>
            </div>
            <input type="text" className="form-control" onChange={(e) => setKey(e.target.value)} />
            <button className="input-group-append btn btn-secondary btn-lg" type="button" onClick={props.onClick}>Search<i
                className="bi bi-search" ></i></button>
        </div>
    );
}
export default SearchBar