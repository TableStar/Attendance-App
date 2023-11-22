import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helper";

const initialState = [];
const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    setListEmp: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { setListEmp } = employeeListSlice.actions;
export default employeeListSlice.reducer;

export const getAllEmployee = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL + "/api/auths", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data.result);
      dispatch(setListEmp(response.data.result))
    } catch (error) {
      console.log(error);
    }
  };
};
