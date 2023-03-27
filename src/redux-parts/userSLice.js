import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        description:'',
        skills:[],
    },

    reducers: {
        updateUser: (state, action) => {
            state.description = action.payload.description
            state.skills = action.payload.skills
        }
    }
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer