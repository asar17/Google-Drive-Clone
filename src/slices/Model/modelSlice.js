import {createSlice} from '@reduxjs/toolkit'
const initialState={
    folderBool:false,
    modelBool:false,
    photoBool:false,
}




const modelSlice=createSlice({
    name:"model",
    initialState,
    reducers:{
        setBool:(state,action)=>{
          state.folderBool=action.payload.folderBool
          state.modelBool=action.payload.modelBool
          state.photoBool=action.payload.photoBool
        },
        
    }
})

export const {setBool}=modelSlice.actions
export default modelSlice.reducer