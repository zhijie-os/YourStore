import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        token:null,
        loggedIn: false,
        userID: null,
        userType: null,
        category: "All",
        key: "",
    },
    status: 'idle',
};

export const GlobalStateSlice = createSlice({
    name: 'GlobalState',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        login: (state, action) => {
            state.value.loggedIn = true;
            state.value.userID = action.payload.userID;
            state.value.userType = action.payload.userType;
            state.value.token = action.payload.token;
        },
        logout: (state) => {
            state.value.loggedIn = false;
            state.value.userID = null;
            state.value.userType = null;
            state.value.token = null;
        },
        selectCategory: (state, action) => {
            state.value.category = action.payload;
        },
        enterSearchKey: (state, action) => {
            state.value.key = action.payload;
        },
        clean: (state,action) => 
        {
            state.value.loggedIn = false;
            state.value.userID= null;
            state.value.userType= null;
            state.value.category= "All";
            state.value.key= "";
            state.value.token = null;
        }
    },
});

export const { login, logout, selectCategory, enterSearchKey,clean} = GlobalStateSlice.actions;

export const selectGlobalState = (state) => state.GlobalState.value;

export default GlobalStateSlice.reducer;
