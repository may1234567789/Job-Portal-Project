import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        SingleJob: null,
        isApplied: false,
        searchJobByText: "",
        allAppliedJobs: [],
        searchdQuery: "",
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
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchdQuery = action.payload;
        }


    },
});

export const { setAllJobs, setSingleJob, setIsApplied, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
