import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employeeSlice";
import employeeListReducer from "./slice/listSlice";
import personalAttendanceReducer from "./slice/personalAttendanceSlice"

const globalState = configureStore({
  reducer: { employeeReducer, employeeListReducer, personalAttendanceReducer },
});

export default globalState;
