import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import {setPhotoDisplay} from '../slices/photoDisplay/photoSlice'

function PhotoDisplay(){
    const globalInfo=useSelector((state)=>{
        return state.photos
    })
    const dispatch=useDispatch()
    const closePhoto=()=>{
       dispatch(setPhotoDisplay({photo:null}))
    }
    return(
        <>
        <Container show={globalInfo.photo} onClick={closePhoto}>
            <span>{globalInfo.title}</span>
            <PhotoDisplay2>
                <img src={globalInfo.photo} alt="mmm"/>
            </PhotoDisplay2>
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
transform:${props=>props.show?`translateY(0)`:`translateY(100%)`};
span{
    color:white;
    font-size:40px;
    position:absolute;
    top:0;
}
`
const PhotoDisplay2=styled.div`
max-width: 760px;
max-height: 475px;
height: 475px;
width: 760px;
img {
  width: 100%;
  height: 100%;
}
`
export default PhotoDisplay;