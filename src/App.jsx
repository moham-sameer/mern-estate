import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
const App = () => {
  
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
