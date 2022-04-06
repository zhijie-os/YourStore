import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        loggedIn: false,
        userID: null,
        userType: null,
        category: null,
        key: "",
        product: [],
        inventory: [],
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
        },
        logout: (state) => {
            state.value.loggedIn = false;
            userID = null;
            userType = null;
        },
        selectCategory: (state, action) => {
            state.value.category = action.payload;
        },
        enterSearchKey: (state, action) => {
            state.value.key = action.payload;
        },
        searchProduct: (state,action) =>{
            state.value.product = action.payload;
        },
        searchInventory: (state,action) =>{
            state.value.inventory = action.payload;
        },
    },
});

export const { login,logout,selectCategory, enterSearchKey, searchProduct, searchInventory} = GlobalStateSlice.actions;

export const selectCount = (state) => state.GlobalState.value;

export default GlobalStateSlice.reducer;
