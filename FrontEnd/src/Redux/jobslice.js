import SingleJob from "@/components/Shared/singlejob";
import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        SingleJob: null,
        isApplied: false,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state,action) =>{
            state.SingleJob = action.payload;
        },
        setIsApplied: (state, action) => {
            state.isApplied = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        }
    },
});

export const { setAllJobs, setSingleJob, setIsApplied, setAllAdminJobs } = jobSlice.actions;
export default jobSlice.reducer;