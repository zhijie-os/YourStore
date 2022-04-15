import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch, connectAdvanced } from 'react-redux';

import {
    enterSearchKey,
    selectCategory,
    selectGlobalState
} from '../Redux/globalStateSlice';

import { store } from '../Redux/store'
import Form from 'react-bootstrap/Form'

function SearchBar(props) {


    const [loaded, setLoaded] = useState(false);
    const [allCategories, setAll] = useState([]);

    // global state
    const gs = useSelector(selectGlobalState);

    const dispatch = useDispatch();


    // called only the first time loading
    useEffect(() => {
        // get the list of all categories
        axios.get("http://127.0.0.1:8888/categories",{
            headers: {
                'Authorization': "Bearer "+store.getState().GlobalState.value.token
            }})
            .then(res => {
                setLoaded(false);
                // set the allCategories
                let result = [{"Title":"All"}];
                setAll(result.concat(res.data));
                // set loaded
                setLoaded(true);
            })
    }, [])


    // set selected category in the global state
    const setCategory = (category) => {
        dispatch(selectCategory(category));
    }

    // set the intending key in the search bar
    const setKey = (key) => {
        dispatch(enterSearchKey(key));
    }


    const makeCategories = () => {
        let categoriesBar = [];

        
        categoriesBar.push(
        <option 
        key={store.getState().GlobalState.value.category} 
        value={store.getState().GlobalState.value.category}>
            {store.getState().GlobalState.value.category}
            </option>);

    
        allCategories.filter((category)=>{
            return category.Title != store.getState().GlobalState.value.category;
        }).map((category)=>{
            categoriesBar.push(<option key={category.Title} value={category.Title}>{category.Title}</option>);
        });

        return categoriesBar;
    };




    return (
        <div className="input-group search-bar">


            <Form.Select className="limit-width" onChange={(e) => setCategory(e.target.value)}>
                {/* {loaded && allCategories.map(category => <option key={category.Title}
                    value={category.Title}
                >{category.Title}</option>)} */}
                {loaded && makeCategories()}
            </Form.Select>
            <input type="text" placeholder={store.getState().GlobalState.value.key} className="form-control" onChange={(e) => setKey(e.target.value)} />
            <button className="input-group-append btn btn-secondary btn-lg" type="button" onClick={props.onClick}>Search<i
                className="bi bi-search" ></i></button>
        </div>
    );
}
export default SearchBar