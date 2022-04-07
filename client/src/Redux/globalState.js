import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  selectGlobalState
} from './globalStateSlice';

export function GlobalState() {
  const count = useSelector(selectGlobalState);
  const dispatch = useDispatch();

  return (
    <div>
      <div >
        <button

          aria-label="Login"
          onClick={() => dispatch(login({ userID: "ID", userType: "Type" }))}
        >
          Login
        </button>
        <span >{count.loggedIn} == {count.userID} == {count.userType}</span>
        <button

          onClick={() => dispatch(login({ userID: "John", userType: "Teacher" }))}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
