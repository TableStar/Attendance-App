import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employeeSlice";

const globalState = configureStore({ reducer: { employeeReducer } });

export default globalState;
