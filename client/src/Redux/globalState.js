import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  logout,
  searchProduct,
  selectCount
} from './globalStateSlice';

export function GlobalState() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  

  return (
    <div>
      <div >
        <button

          aria-label="Login"
          onClick={() => dispatch(login({userID:"ID",userType:"Type"}))}
        >
        Login
        </button>
        <span >{count.loggedIn} == {count.userID} == {count.userType}</span>
        <button

          onClick={() => dispatch(login({userID:"John",userType:"Teacher"}))}
        >
        Logout
        </button>
      </div>
    </div>
  );
}
