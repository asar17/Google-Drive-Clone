import React, { useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Header,SideBar,Drive,Model,FolderModel,PhotoModel,PhotoDisplay,Login,FolderDisplay} from './components'

function App() {
  //const [userStorage,setUserStorage]=useState(null)
  const uid=useSelector((state)=>{
    return state.user.uid
  })
  return (
    <Router>
      <Header/>
      {
        uid  ?
        (
          <>
          <Border>
              <Container>
                <SideBar/>
                <Routes>
                  <Route exact  path="/" element={<Drive/>}/>
                  <Route path="/folder/:id/:title" element={<FolderDisplay/>}/>
                </Routes>
              </Container>
          </Border>
          <Model/>
          <FolderModel/>
          <PhotoModel/>
          <PhotoDisplay/>
          </>
        )
        :
        (<Login/>)
      }
    </Router>
    
  );
}
const Container=styled.div`
display:flex;
flex:1;
`

const Border=styled.div`
`

export default App;
