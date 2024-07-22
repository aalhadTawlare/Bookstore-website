import { createSlice } from "@reduxjs/toolkit";
import { GrLogout } from "react-icons/gr";

const authSlice = createSlice(
    {
        name:'auth',
        initialState:{ isLoggedIn: false ,role:"user"},
        reducers:{
            login(state){
                state.isLoggedIn = true;
            },
            Logout(state){
                state.isLoggedIn = false;
            },
            changeRole(state,action){
                const role = action.payload;
                state.role = role;
            },
        },
    });

    export const authActions = authSlice.actions;
    export default authSlice.reducer;