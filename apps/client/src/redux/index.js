import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employeeSlice";
import employeeListReducer from "./slice/listSlice";

const globalState = configureStore({
  reducer: { employeeReducer, employeeListReducer },
});

export default globalState;
