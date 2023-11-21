import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    setListEmp: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setListEmp } = employeeListSlice.actions;
export default employeeListSlice.reducer;

export const getAllEmployee=() => {
  return async (dispatch) => {
    try {
        
    } catch (error) {
        
    }
  }
}

