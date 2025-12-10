import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allJobs: [],
  singleJob: null,
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
  },
});

export const { setLoading, setAllJobs, setSingleJob } = authSlice.actions;
export default authSlice.reducer;
