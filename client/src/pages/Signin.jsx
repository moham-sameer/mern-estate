import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault();
      dispatch(signInStart())
      const data = await axios.post("http://localhost:3000/api/auth/signin",
       formData
      );
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
      console.log(data)
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="email"
          placeholder="email"
        />
        <input
          type="password"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="password"
          placeholder="password"
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
           {loading? 'Loading...':"Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Signin;
