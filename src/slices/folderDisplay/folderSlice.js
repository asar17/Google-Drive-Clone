import {createSlice} from '@reduxjs/toolkit'
const initialState={
    folderId:null,
    folderName:null
}

const folderSlice=createSlice({
    name:"folders",
    initialState,
    reducers:{
        setFolderDisplay:(state,action)=>{
            state.folderId=action.payload.folderId
            state.folderName=action.payload.folderName

        }
    }
})
export default folderSlice.reducer
export const {setFolderDisplay} =folderSlice.actions