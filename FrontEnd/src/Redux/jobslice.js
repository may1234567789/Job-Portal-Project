import SingleJob from "@/components/Shared/singlejob";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        SingleJob: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state,action) =>{
            state.SingleJob = action.payload;
        }
    },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;