import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [Values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    address:"",
  });
  const navigate = useNavigate();
  const change = (e) =>{
    const {name,value} = e.target;
    setValues({...Values,[name]:value});
  };
  const submit = async()=>{
    try {
      if(Values.username === ""||Values.email === ""||Values.password === ""||Values.address === "")
        {
          alert("All entries are required")
        }
        else
        {
          const response = await axios.post("http://localhost:3000/api/v1/signup",Values);
          alert(response.data.message);
          navigate("/login");
        }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:3/6 lg:w-2/6">
      <p className='text-zinc-299 text-xl text-white'>SignUp</p>
      <div className='mt-4'>
        <div>
            <label htmlFor="" className='text-zinc-400'>Username</label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Username' name='username' required value={Values.username}
            onChange={change}/>
        </div>
        <div className='mt-4'>
        <div>
            <label htmlFor="" className='text-zinc-400'>Email</label>
            <input type="email" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Email' name='email' required value={Values.email}
            onChange={change}/>
        </div>
        </div>
        <div className='mt-4'>
        <div>
            <label htmlFor="" className='text-zinc-400'>Password</label>
            <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='Password' name='password' required value={Values.password}
            onChange={change}/>
        </div>
        </div>
        <div className='mt-4'>
        <div>
            <label htmlFor="" className='text-zinc-400'>Address</label>
            <textarea name="address" id="" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' value={Values.address} onChange={change}/>
        </div>
        </div>
        <div className="mt-4">
          <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-white hover:text-black'
          onClick={submit}>
          SignUp
          </button>
        </div>
        <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>Or</p>
        <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
          ALready have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
          <u>LogIn</u>
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default Signup