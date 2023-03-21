import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id:0,
        username:"",
    },

    reducers: {
        //Switches to a new user
        updateUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
        }
    }
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer