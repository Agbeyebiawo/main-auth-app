import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true
        },
        signInSuccess: (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        signInFailure: (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        updateSuccess: (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        deleteUserSuccess: (state,action)=>{
            state.currentUser = null
            state.loading = false
            state.error = false
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
    }
})

export const getCurrentUser = (state)=> state.user.currentUser
export const getLoading = (state)=> state.user.loading
export const getError = (state)=> state.user.error
export const {signInFailure,signInStart,signOut,signInSuccess,updateSuccess,deleteUserSuccess} = userSlice.actions
export default userSlice.reducer