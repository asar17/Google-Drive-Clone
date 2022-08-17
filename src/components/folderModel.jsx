import React,{useState} from 'react'
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import {setBool} from '../slices/Model/modelSlice'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from '../firebase/firebase'
function FolderModel(){
    const dispatch=useDispatch()
    const [folderNames,setFolderNames]=useState("")
    const [loading,setLoading]=useState(false)
    //to hide or show new folder
    const folderBool=useSelector((state)=>{
        return state.model.folderBool
    })
    //to get id of user
    const uid=useSelector((state)=>{
        return state.user.uid
    })
   

    //to insert name folder in database
    const Submit=async(e)=>{
        e.preventDefault();
        if(loading) return;
        setLoading(true)
        if(folderNames.length<1) return;
        await addDoc(collection(db,"folder"),{
            name:folderNames,
            timestamp:serverTimestamp(),
            uid:uid

        });
        setLoading(false)
        dispatch(setBool({folderBool:false}))
        setFolderNames("")
    

    }
     //end of method
       
    
    return(
       <>
       <Container folderBool={folderBool}>
           <Wrapper onSubmit={Submit}>
               <Title>
                   <span>New Folder</span>
               </Title>
               <InputContainer>
                 <input type="text" value={folderNames} placeholder="Create Folder" onChange={(e)=>setFolderNames(e.target.value)} />
               </InputContainer>
               <Button>
                   <button onClick={()=>{dispatch(setBool({folderBool:false}))}}>Cancel</button>
                   <button className="create" disabled={loading}  onClick={Submit}>
                     {loading?"Creating...":"CreateFolder"}  
                    </button>
               </Button>
           </Wrapper>
       </Container>
       </>
    )
}
const Container=styled.div`
z-index:999;
top:0;
left:0;
bottom:0;
right:0;
position:fixed;
background-color:rgba(0,0,0,0.9);
display:flex;
align-items:center;
justify-content:center;
transition:all 200ms ease-out;
transform:${props=>props.folderBool?`translateY(0)`:`translateY(100%)`};
`
const Wrapper=styled.div`
width:500px;
height:130px;
background-color:white;
border-radius:20px;
position:relative;
`
const Title=styled.span`
font-size:20px;
margin:20px;
`
const InputContainer=styled.div`
display:flex;
flex-direction:row;
margin:20px;
flex:1;
input{
    border:none;
    flex:1;
    :focus{
        outline:none;
    }
}
border-bottom:1px solid rgba(0,0,0,0.2);
`
const Button=styled.div`
position:absolute;
bottom:5px;
right:10px;
display:flex;
align-items:center;
button{
    padding:10px 20px;
    border-radius:4px;
    background-color:#ef4444;
    color:white;
    border:none;
    margin:0 15px;
    cursor:pointer;
}
.create{
    background-color:#3b82f6;
}
`




export default FolderModel;