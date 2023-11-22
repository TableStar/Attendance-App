import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helper";

const initialState = {
  token: localStorage.getItem("token"),
  username: "",
  role: "",
};
const employeeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = localStorage.getItem("token");
      state.username = action.payload.username;
      state.role = action.payload.role;
      console.log(state);
    },
    logout: (state, action) => {
      return (state = {
        ...initialState,
        token: localStorage.removeItem("token"),
      });
    },
  },
});

export const { login, logout } = employeeSlice.actions;
export default employeeSlice.reducer;

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL + "/api/auths/keeplogin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      localStorage.setItem("token",response.data.result.token);
      dispatch(login(response.data.result));
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message.toLowerCase().includes("invalid") ||
        error.response.data.message.toLowerCase().includes("empty")
      ) {
        dispatch(logout());
      }
    }
  };
};
