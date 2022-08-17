import styled from 'styled-components'
import {CreateNewFolder,AddPhotoAlternate} from '@mui/icons-material'
import {useSelector,useDispatch} from 'react-redux'
import {setBool} from '../slices/Model/modelSlice'
function Model(){
    const modelBool=useSelector((state)=>{
        return state.model.modelBool
    })
    const dispatch=useDispatch()
    
    return(
       <>
       <Container modelBool={modelBool}>
           <Wrapper>
               <Header>
                   <Wraps onClick={()=>{dispatch(setBool({folderBool:true}))}}>
                       <CreateNewFolder/>
                       <span>Folder</span>
                   </Wraps>   
               </Header>
               <Header>
                   <Wraps onClick={()=>{dispatch(setBool({photoBool:true}))}}>
                       <AddPhotoAlternate/>
                       <span>photo</span>
                   </Wraps>
               </Header>
           </Wrapper>
       </Container>
       </>
    )
}
const Container=styled.div`
position:fixed;
top:100px;
left:40px;
background-color:white;
height:200px;
width:300px;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 /0.1);
border-radius:20px;
transition:all 200ms ease-out;
transform:${props=>props.modelBool?`translateX(-0%)`:`translateX(-200%)`}
`
const Wrapper=styled.div`
display:flex;
flex-direction:column;
`
const Header=styled.div`
padding-bottom:10px;
border-bottom:1px solid rgba(0,0,0,0.2);
margin:10px 0;
`
const Wraps=styled.div`
display:flex;
align-items:center;
padding:5px 0;
cursor:pointer;
padding-left:20px;
margin-top:10px;
transition:all 200ms ease-out;
&:hover{
    background-color:rgba(0,0,0,0.2);
}
svg{
    color:rgba(0,0,0,0.5);
}
span{
    margin-left:10px;
}
`




export default Model