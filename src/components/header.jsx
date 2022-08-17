import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {ButtonGroup,Avatar} from '@mui/material'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {setLogOut} from '../slices/user/userSlice'

import {useNavigate} from 'react-router-dom'
function Header(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    //get the photo of user
    const photo2=useSelector((state)=>{
        return state?.user?.photo
    })

    return(
       <Container>
           <Wrapper onClick={()=>{navigate("/")}}>
               <Logo>
                   <img src="/img/google-logo.png" alt=""/>
                   <span>Drive</span>
               </Logo>
               <InputContainer>
                    <SearchContainer>
                        <ButtonGroup>
                            <SearchIcon/>
                        </ButtonGroup>
                        <input type="text" placeholder="Search in Drive"/>
                    </SearchContainer>
               </InputContainer>
               <RightContainer>
                   <LeftSection>
                       <HelpOutlineIcon/>
                       <SettingsOutlinedIcon/>
                       <MeetingRoomIcon   onClick={()=>dispatch(setLogOut())}/>
                   </LeftSection>
                   <RightSection>
                       <AppsOutlinedIcon className="app"/>
                       <Avatar src={photo2}/>
                   </RightSection>
               </RightContainer>
               
           </Wrapper>
           
           
       </Container>
    )

 }

 const Container = styled.div`
 position: sticky;
 top: 0;
 z-index: 999;
 background-color: #ffffff;
 display:flex
 padding: 2px;
 
`;

const Wrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin: 10px 20px;
`;

const Logo = styled.div`
 display: flex;
 align-items: center;
 border-bottom:1px solid rgba(0,0,0,0.2);


 img {
   width: 40px;
   height: 40px;
 }

 span {
   font-family: "Product Sans", Arial, sans-serif;
   color: #5f6368;
   font-size: 22px;
   padding-left: 8px;
 }
`;

const InputContainer = styled.div`
 flex: 1;
 border-bottom:1px solid rgba(0,0,0,0.2);
 margin-bottom:10px;

 @media screen and (min-width:200px) and (max-width:540px){
   display:flex;
   flex:2 0 auto;

 }
`;

const RightContainer = styled.div`
 display: flex;
 align-items: center;
 border-bottom:1px solid rgba(0,0,0,0.2);
 margin-bottom:0;

 @media screen and (min-width:200px) and (max-width:540px){
  display:flex;
  flex:0 2 auto;
}
`;

const SearchContainer = styled.div`
 width: 64%;
 height: 50px;
 margin: 0 auto;
 display: flex;
 align-items: center;
 background-color: rgba(0, 0, 0, 0.09);
 border-radius: 8px;
 box-shadow: 0 1px 2px 0 rgb(0 0 0 /0.05);
 @media screen and (min-width:200px) and (max-width:540px){
  width:100%;
  margin-left:15px;
}

 svg {
   margin-left: 10px;
   color: #5f6368;
 }

 input {
   font-size: 16px;
   width: 90%;
   height: 80%;
   font-family: Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
   margin: 0 auto;
   background-color: transparent;
   :focus {
     outline: none;
   }

   border: none;
 }
`;

const RightSection = styled.div`
 display: flex;
 align-items: center;

 svg {
   color: #5f6368;
   padding: 5px;
   cursor: pointer;
   border-radius: 50%;
   transition: all 200ms ease-out;
   :hover {
     background-color: rgba(0, 0, 0, 0.09);
   }
 }

 .app {
   margin-right: 15px;
 }
`;

const LeftSection = styled(RightSection)`
 margin-right: 40px;

 svg {
   margin: 0 10px;
 }
`;

export default Header
