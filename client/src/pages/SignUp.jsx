import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      
      e.preventDefault();
      setLoading(true)
      const data = await axios.post("http://localhost:3000/api/auth/signup",
       formData
      );
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
      console.log(data)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          onChange={handleChange}
          className="border p-3 rounded-lg "
          id="username"
          placeholder="username"
        />
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
           {loading? 'Loading...':"Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
