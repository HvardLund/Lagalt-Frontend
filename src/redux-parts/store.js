import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSLice"

export default configureStore({
    reducer: {
        updateUser: userReducer,
        addProjects: userReducer,
    },
})