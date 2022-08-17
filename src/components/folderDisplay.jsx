import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import styled from 'styled-components'
import {FileList} from './index'
import {setBool} from '../slices/Model/modelSlice'
import { onSnapshot,query,collection,orderBy } from 'firebase/firestore'
import db from '../firebase/firebase'
import {useNavigate} from 'react-router-dom'
function FolderDisplay(){
    const {folderId}=useSelector((state)=>{
        return state.folders
    })
    console.log("folder",folderId)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [photoFolder,setPhotoFolder]=useState([])
    //if no folder navigate to home
    useEffect(()=>{
        if(!folderId){
            localStorage.clear();
            navigate("/")
            document.location.reload()
        }
    },[folderId,navigate])
    //get all photos inside folder
    useEffect(()=>{
       return onSnapshot(
            query(collection(db,"folder",folderId,"folderTree"),orderBy("timestamp","asc")
            ),
            (snapshot)=>{
                setPhotoFolder(snapshot.docs)
            }
        )
    },[folderId])
    return(
       <>
       <Container onClick={()=>dispatch(setBool({modelBool:false}))}>
          {
              photoFolder.length?
              (
                            <GridContainer>
                            {
                                photoFolder.map((data)=>{
                                    return(
                                    <FileList 
                                    img={data?.data().Image} 
                                    title={data?.data().photoTitle}
                                    key={data?.id}
                                    />
                                    )
                                })
                            }
                        </GridContainer> 
              ):
              (
                   <div className="empty-photo">
                       <h1>no photos</h1>
                   </div>
              )
          }
       </Container>
       </>
    )
}
const Container=styled.div`
position:relative;
display:flex;
flex-grow:1;
flex-direction:column;
padding:15px 30px;
.empty-photo{
    display:flex;
    align-items:center;
    justify-content:center;
    color:red;
    margin:auto;
    text-transform:capitalize;
    font-size:2rem;
    font-style:italic;
}
`
const GridContainer=styled.div`
display:grid;
margin:20px 0;
grid-template-columns: repeat(3, minmax(0, 1fr));
`
export default FolderDisplay;