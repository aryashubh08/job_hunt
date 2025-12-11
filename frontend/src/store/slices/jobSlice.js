import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allJobs: [],
  singleJob: null,
  allAdminJobs: [],
  searchJobByText: "",
};

const authSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const {
  setLoading,
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
} = authSlice.actions;
export default authSlice.reducer;
