import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./../Slice/JobSlice";
import  userReducer from "./../Slice/UserSlice";
const store = configureStore({
  reducer: {
    job: jobReducer,
  user:userReducer,
},
});

export default store;
