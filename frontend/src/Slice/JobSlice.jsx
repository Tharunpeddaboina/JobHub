import { createSlice } from"@reduxjs/toolkit"

export const JobSlice=createSlice({
 name: 'job',
 initialState:{
    jobs:[],
    loading: false, 
    error: null        
 },
 reducers:{
    setJobs:( state,action) =>{
        state.jobs= action.payload;

    },
    setLoading: (state, action) => {
        state.loading = action.payload; 
    },
      setError: (state, action) => {
        state.error = action.payload;    
      },


 }


})

 export const { setJobs,setError,setLoading}=JobSlice.actions;
export default JobSlice.reducer