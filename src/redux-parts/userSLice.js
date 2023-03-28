import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        description:'',
        skills:[],
        projects:[],
    },

    reducers: {
        updateUser: (state, action) => {
            state.description = action.payload.description
            state.skills = action.payload.skills
        },
        addProjects: (state, action) => {
            state.projects = action.payload.projects
        }
    }
})

export const {updateUser, addProjects} = userSlice.actions
export default userSlice.reducer