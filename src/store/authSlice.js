import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState : {id: 1 , isLoggedIn: true},

    reducers:{

        LoggedToggle(state) {
            state.isLoggedIn = !state.isLoggedIn
        },

    }
})

export const { LoggedToggle } = authSlice.actions;

export default authSlice.reducer;