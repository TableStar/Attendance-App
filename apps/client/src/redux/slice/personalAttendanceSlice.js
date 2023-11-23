import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../helper";

const personalAttendanceSlice = createSlice({
    name: "personalAttendance",
    initialState: {
        attendances: []
    },
    reducers: {
        setAttendances: (state, action) => {
            state.attendances = action.payload
        }
    }
})

export const { setAttendances } = personalAttendanceSlice.actions;
export default personalAttendanceSlice.reducer;

// Middleware
export const getPersonalAttendance = (query = "") => {
    return async (dispatch) => {
        try {
            const response = await axios.get(API_URL + `/api/attendances${query}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setAttendances(response.data.result))
        } catch (error) {
            console.log(error);
        }
    }
};