import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
  } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import db,{storage} from '../firebase/firebase'

import styled from 'styled-components'
import {useState,useRef} from 'react'
import {CameraAlt,Close} from '@mui/icons-material'
import {useSelector,useDispatch} from 'react-redux'
import {setBool} from '../slices/Model/modelSlice'


function PhotoModel(){
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const ImageRef=useRef(null)
    const [input,setInput]=useState("")
    const [selectedImg,setSelectedImg]=useState(null)
    const setImage=(e)=>{
        const reader=new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
            reader.onload=(Event)=>{
                setSelectedImg(Event.target.result)
            }
        }
    }
    const resetImg=(e)=>{
        setSelectedImg(null)
    }
    const resetImg2=(e)=>{
        dispatch(setBool({photoBool:false}))
        setSelectedImg(null)
        setInput("")
    }
    //useSelector
    const photoBool=useSelector((state)=>{
        return state.model.photoBool
    })
    //get user id
    const uid=useSelector((state)=>{
        return state.user.uid
    })
    //get id of folder
    const {folderId}=useSelector((state)=>{
        return state.folders
    })
    //insert photo in database when photo only or photo inside folder
    const Submit=async(e)=>{
        e.preventDefault()
        if(loading) return;
        setLoading(true)
        if(input.length<1) return;
        //photo inside folder
        if(folderId){
            const doc2=await addDoc(collection(db,"folder",folderId,"folderTree"),{
            photoTitle:input,
            timestamp:serverTimestamp(),
            uid:uid
            })
            const images=ref(storage,`folder/${folderId}/${doc2.id}image`)
            await uploadString(images,selectedImg,"data_url").then(async(snapshot)=>{
                const downloadUrl=await getDownloadURL(images)
                await updateDoc(doc(db,"folder",folderId,"folderTree",doc2.id),{
                    Image:downloadUrl
                })
            })

        }
        //end of if
        //photo only
        else{
            const docs=await addDoc(collection(db,"post"),{
                photoTitle:input,
                timestamp:serverTimestamp(),
                uid:uid
                
            })
            //how to insert image to firebase database
            //1-make reference for your image by [ref method] accept two paramter[storage,your text]
            const images=ref(storage,`post/${docs.id}/image`)
            //2-make your image تشاور for ref by [uploadString method] accept three paramter [const ref,yourImage,"data-url"]
            //then callbackfunction by [then method] accept snapshot as paramter
            await uploadString(images,selectedImg,"data_url").then(
                async(snapshot)=>{
                //3-get the url image that store in ref by [getDownloadURL] that accept ref as paramter
                const downloadUrl=await getDownloadURL(images)
                //4-update your document by [updataDoc method]
                await updateDoc(doc(db,"post",docs.id),{
                    Image:downloadUrl,
                })
            })
        }//end of else
        setLoading(false)
        dispatch(setBool({photoBool:false}))
        setInput("")
        setSelectedImg(null)
    }
    //end of insert
    return(
        <>
        <Container photoBool={photoBool}>
            <CloseIcon onClick={(e)=>resetImg2()}>
                <Close/>
            </CloseIcon>
            <Wrapper onSubmit={Submit}>
                <CloseImg onClick={(e)=>{resetImg()}}>
                    <Close/>
                </CloseImg>
                <ImageContainer>
                    {
                        selectedImg?
                        (<img src={selectedImg} alt=""/>):
                        (<CameraContainer>
                            <CameraAlt onClick={()=>ImageRef.current.click()}/>
                        </CameraContainer>
                        )
                    }
                    <input type="file" hidden ref={ImageRef} onChange={setImage} />
                </ImageContainer>
                <TextContainer>
                    <input type="text" placeholder="Enter Photo Title" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                </TextContainer>
                <ButtonContainer>
                    <button onClick={Submit} disabled={loading}>{loading?"Submiting....":"Submit"}</button>
                </ButtonContainer>
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
transform:${props=>props.photoBool?`translateY(0)`:`translateY(100%)`}
`
const Wrapper=styled.div`
width:400px;
height:400px;
background-color:white;
border-radius:20px;
position:relative;
z-index:999;
`
const CloseImg=styled.div`
position:absolute;
top:10px;
right:10px;
svg{
    cursor:pointer;
    color:white;
    width:2rem;
    height:2rem;
}
`
const ImageContainer=styled.div`
height:50%;
width:100%;
margin-bottom:20px;
img{
    width:100%;
    height:100%;
    border-top-left-radius:20px;
    border-top-right-radius:20px;

}
`
const TextContainer=styled.div`
display:flex;
flex:1;
border-bottom:1px solid black;
margin:0 20px;
input{
    display:flex;
    flex:1;
    font-size:18px;
    border:none;
    text-transform:capitalize;
    :focus{
        outline:none;
    }
}
`
const ButtonContainer=styled.div`
position:absolute;
bottom:30px;
right:30px;
button{
    padding:10px 20px;
    cursor:pointer;
    border-radius:4px;
    border:none;
    box-shadow:0 1px 2px 0 rgb(0 0 0 /0.05);
    background-color:#3b82f6;
    color:white;
    transition:all 200ms ease-out;
    :hover{
        transform:scale(1.001);
    }
    :active{
        transform:scale(1.009);
    }
}
`
const CameraContainer=styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100%;
svg{
    color:rgba(0,0,0,0.5);
    width:2.5rem !important;
    height:2.5rem;
    cursor:pointer;
}
`
const CloseIcon=styled.div`
position:absolute;
top:10px;
right:10px;
svg{
    cursor:pointer;
    color:white;
    width:2rem;
    height:2rem;
}
`




export default PhotoModel;