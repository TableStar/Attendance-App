import { createSlice } from "@reduxjs/toolkit";

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
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state, action) => {
      state = { ...initialState, token: localStorage.removeItem("token") };
    },
  },
});

export const { login, logout } = employeeSlice.actions;
export default employeeSlice.reducer;


export const keepLogin =() => {
  
}
