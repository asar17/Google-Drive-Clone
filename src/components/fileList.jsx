import {InsertPhoto} from '@mui/icons-material'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {setPhotoDisplay} from '../slices/photoDisplay/photoSlice'
function FileList({img,title}){
    const dispatch=useDispatch();
    const photoDisplay=()=>{
       dispatch(setPhotoDisplay({photo:img,title:title}))
      }
    return(
        <>
        <Container>
            <PhotoContainer onClick={photoDisplay}>
                <img src={img} alt="photo" />
            </PhotoContainer>
            <PhotoTitle>
                <InsertPhoto/>
                <span>{title}</span>
            </PhotoTitle>
        </Container>
        </>
    )
}
const Container=styled.div`
max-width:300px;
max-height:400px;
height:209px;
display:flex;
flex-direction:column;
border-radius:20px;
margin:10px 0;
box-shadow:0 4px 6px -1px rgba(0 0 0 / 0.1),0 2px 4px -2px rgba(0 0 0 / 0.1);
@media screen and (min-width:200px) and (max-width:912px){
       padding-left:20px;
    
  }
`
const PhotoContainer=styled.div`
width:100%;
height:60%;
background-color:lightgray;
border-top-left-radius:inherit;
border-top-right-radius:inherit;
cursor:pointer;
img{
    height:100%;
    width:100%;
    border-top-left-radius:inherit;
    border-top-right-radius:inherit;
    border-bottom:1px solid rgba(0,0,0,0.2);
}
`
const PhotoTitle=styled.div`
display:flex;
align-items:center;
margin-top:20px;
margin-left:10px;
svg{
    color:#70b5f9
}
span{
    color:rgba(0,0,0,0.72);
    margin-left:20px;
    padding-bottom:4px;
    font-size:13px;
    font-weight:600;
}
`

export default FileList