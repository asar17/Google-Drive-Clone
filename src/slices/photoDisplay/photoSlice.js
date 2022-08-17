import {createSlice} from '@reduxjs/toolkit';

const initialState={
    photo:null,
    title:'athar',
}
const photoSlice=createSlice({
    name:"photos",
    initialState,
    reducers:{
        setPhotoDisplay:(state,action)=>{
            state.photo=action.payload.photo;
            state.title=action.payload.title
        }
    }
})

export default photoSlice.reducer;
export const {setPhotoDisplay}=photoSlice.actions