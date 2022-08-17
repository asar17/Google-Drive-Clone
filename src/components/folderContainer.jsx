import styled from 'styled-components'
import {Folder} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import {setFolderDisplay} from '../slices/folderDisplay/folderSlice'
import {useDispatch} from 'react-redux'
function FolderContainer({title,id}){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const folderDisplay=()=>{
        if(id){
            dispatch(setFolderDisplay({folderId:id,folderName:title}))
            navigate(`/folder/${id}/${title}`)
        }
    }
    return(
        <>
        <Container onClick={folderDisplay}>
            <Folder/>
            <span>{title}</span>
        </Container>
        </>
    )
}
const Container=styled.div`
width:287.5px;
height:48px;
border:1px solid rgba(0,0,0,0.35);
display:flex;
align-items:center;
border-radius:4px;
cursor:pointer;
svg{
    color:rgba(95,99,104);
    height:24px;
    width:24px;
    margin-left:4px;
}
span{
    font-size:13px;
    padding-left:10px;
}
`
export default FolderContainer