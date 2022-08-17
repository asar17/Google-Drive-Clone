import {createSlice} from '@reduxjs/toolkit';

const initialState={
    uid:null,
    photo:null
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setLogIn:(state,action)=>{
            state.uid=action.payload.uid;
            state.photo=action.payload.photo;
        },
        setLogOut:(state)=>{
            state.uid=null;
            state.photo=null
        }
    }
})

export default userSlice.reducer;
export const {setLogIn,setLogOut}=userSlice.actions