import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
 const dispatch =   useDispatch()
 const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
             const result = await signInWithPopup(auth,provider)
             console.log(result)
             const res = await axios.post('http://localhost:3000/api/auth/google',{
                name:result.user.displayName,email:result.user.email,photo:result.user.photoURL
             })
             dispatch(signInSuccess(res))
             navigate('/')
        } catch (error) {
            console.log('could not sign in with google',error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 hover:opacity-95 text-white p-3 rounded-lg uppercase '>Continue with google</button>
  )
}

export default OAuth
