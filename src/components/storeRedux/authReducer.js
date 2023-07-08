import { createSlice } from "@reduxjs/toolkit"


const initialAuthState={
    isAuthenicate:!!localStorage.getItem('token')
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAuthenicate=!!localStorage.getItem('token')
        },
        logout(state){
            localStorage.removeItem('token');
            state.isAuthenicate=false
        }
    }
})

export const authAction=authSlice.actions;
export default authSlice.reducer