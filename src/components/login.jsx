import styled from 'styled-components'
import {signInWithPopup} from 'firebase/auth'
import {auth,provider} from '../firebase/firebase'
import {useDispatch} from 'react-redux'
import {setLogIn} from '../slices/user/userSlice'
function Login(){
    const dispatch=useDispatch()
    const loginWithGoogle=async()=>{
        await signInWithPopup(auth,provider)
              .then((res)=>{
                  let user=res.user;
                  dispatch(setLogIn({uid:user.uid,photo:user.photoURL}))

                })
    }
    return(
        <>
        <Container>
            <Button onClick={loginWithGoogle}>
                Sign In With Google
            </Button>
        </Container>
        </>
    )
}
const Container=styled.div`
position:absolute;
top:0;
right:0;
left:0;
bottom:0;
display:flex;
align-items:center;
justify-content:center;
`
const Button=styled.button`
font-weight:600;
padding:15px 20px;
border:none;
cursor:pointer;
border-radius:15px;
transition:all 300ms ease-out;
:hover{
    transform:scale(1.10);
}
`
export default Login