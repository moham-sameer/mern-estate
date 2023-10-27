import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import axios from 'axios'
import {updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice'
const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const fileRef = useRef(null)
  const [file,setFile] = useState()
  const [filePerc,setFilePerc] = useState(0)
  const [fileError,setFileError] = useState(false)
  const [formData,setFormData] = useState({})
   const dispatch = useDispatch()
  //  console.log(formData)
  console.log(currentUser.data._id)
  // firebase storage
      // allow read;
      // allow write: if
      // request.resource.size < 2 * 1024 * 1024 && 
      // request.resource.contentType.matches('image/.*')
      useEffect(()=>{
        if(file){
          handlefileUpload(file)
        }
      },[file])
      const handlefileUpload = (file) =>{
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on('state_changed',
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress))
        },
        
        (error)=>{
          setFileError(true)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setFormData({...formData,avatar:downloadURL})
          })
        })
      
      }
      const changeHandler = (e)=>{
         setFormData({...formData,[e.target.id]: e.target.value})
      }
      const submitHandler = async(e)=>{
        e.preventDefault()
        try { 
          
        const data = await  axios.post(`http://localhost:3000/api/user/update/${currentUser.data._id}`,formData)
           if(data.success === false){
            dispatch(updateUserFailure(data.message))
            return
           }
           dispatch(updateUserSuccess(data))
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
        
      }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
      
      <input onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*' type='file' ref={fileRef} />
        <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.data.avatar} alt='profile'/>
        <p className='text-center text-sm'>{fileError ? (<span className='text-red-700'>Error Image upload(image must be less than 2mb)</span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>
          {`Uploading ${filePerc}%`}
        </span>): filePerc === 100 ? (<span className='text-green-700'>Image successfully uploaded!</span>):""}</p>
         <input defaultValue={currentUser.data.username}  onChange={changeHandler} type='text' id='username' placeholder='username' className='border p-3 rounded-lg'/>
         <input defaultValue={currentUser.data.email} onChange={changeHandler} type='email' id='email' placeholder='email' className='border p-3 rounded-lg'/>
         <input onChange={changeHandler} type='password' id='password' placeholder='password' className='border p-3 rounded-lg'/>
         <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
         
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'> Delete Account</span>
        <span className='text-red-700 cursor-pointer'> Sign out</span>
      </div>

    </div>
  )
}

export default Profile
