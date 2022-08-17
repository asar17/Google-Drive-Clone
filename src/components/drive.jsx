import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {FileList,FolderContainer} from './index'
import {useDispatch} from 'react-redux'
import {setBool} from '../slices/Model/modelSlice'
import { onSnapshot,collection,query,orderBy } from 'firebase/firestore';
import db from '../firebase/firebase'
function Drive(){
    const dispatch=useDispatch()
    const [photos,setPhotos]=useState([])
    const [folders,setFolders]=useState([])
    //to get all photos in database after the component loading
    useEffect(()=>{
      return onSnapshot(query(collection(db,"post"),orderBy("timestamp","asc")),(snapshot)=>{
        setPhotos(snapshot.docs)
      })
    },[])
    //to get all folders in database after the component loading
    useEffect(()=>{
        return onSnapshot(query(collection(db,"folder"),orderBy("timestamp","asc")),(snapshot)=>{
          setFolders(snapshot.docs)
        })
    },[])
    return(
      <>
        <Container onClick={()=>{dispatch(setBool({modelBool:false}))}}>
         
            <Title>
                <span>My Drive</span>
                <ArrowDropDownIcon/>
            </Title>
            <FileContent>
                <SemiTitle>suggested</SemiTitle>
                <GridContainer>
                  {
                    photos.map((data)=>{
                      return(
                        <FileList 
                        img={data?.data().Image}
                        title={data?.data().photoTitle}
                        key={data?.id}
                        id={data?.id}
                        />
                      )
                    })
                  }
                </GridContainer>
                <Margin>
                  <SemiTitle>folders</SemiTitle>
                  <GridContainer>
                    {
                      folders.map((data)=>{
                        return(
                          <FolderContainer
                          key={data?.id}
                          id={data?.id}
                          title={data?.data().name}
                          />
                        )
                      })
                    }
                  </GridContainer>
                </Margin>
            </FileContent>
        </Container>
        </>
    )
}
const Container=styled.div`
display: flex;
flex-direction: column;
padding: 15px 30px;
padding:15px 30px;
flex-grow: 1;
position: relative;
  
`
const Title=styled.div`
display:flex;
flex-direction:row;
align-items:center;
padding-bottom:13px;
width:100%;

svg{
    margin-left:10px;
    color:#5f6386;
}
span{
    font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-weight:400;
    font-size:18px;
    color: #202124;
}
`
const FileContent=styled.div`
display: flex;
flex-direction: column;
padding-top: 20px;
overflow-y: scroll;
flex-grow: 1;
max-height: 100vh;
margin-bottom: 30px;
border-top:1px solid rgba(0,0,0,0.2);

@media screen and (min-width:200px) and (max-width:280px){
  display:flex;
  flex-grow:3;
  width:570%;
  overflow-x:hidden;
}
@media screen and (min-width:281px) and (max-width:320px){
  display:flex;
  flex-grow:3;
  width:400%;
  overflow-x:hidden;

}
@media screen and (min-width:321px) and (max-width:389px){
  display:flex;
  flex-grow:3;
  width:270%;
  overflow-x:hidden;
}
@media screen and (min-width:390px) and (max-width:414px){
  display:flex;
  flex-grow:3;
  width:235%;
  overflow-x:hidden;
}
@media screen and (min-width:415px) and (max-width:425px){
  display:flex;
  flex-grow:3;
  width:210%;
  overflow-x:hidden;

}
@media screen and (min-width:426px) and (max-width:540px){
  display:flex;
  flex-grow:3;
  width:140%;
  overflow-x:hidden;

}


::-webkit-scrollbar {
  width:15px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  transition: all 200ms ease-out;
  max-height: 100px;

  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
`
const SemiTitle=styled.div`
font-size:14px;
font-weight:400;
color:#5f6386;
text-transform:capitalize;
margin-top:10px;
`
const GridContainer=styled.div`
display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));
margin:20px 0;


`
const Margin=styled.div``



export default Drive