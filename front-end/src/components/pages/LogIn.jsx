import React, { useState } from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {PropagateLoader} from 'react-spinners'
import { UilEye } from '@iconscout/react-unicons'
import { google } from '../../assets';

import { useGoogleLogin } from '@react-oauth/google';

const LogIn = ({setLogged}) => {

  const [mail,setMail]=useState(null)
  const [password,setPassword]=useState(null)
  const [pwdvisibility,setPwdVisibility]=useState(false)

  const [loading, setLoading]=useState(false)

  const navigate=useNavigate();

  const data=yup.object().shape({
    mail:yup.string().email().required(),
    password:yup.string().required()
  })

  const handleSubmit= async (e) => {
    e.preventDefault()
  
      let formData={
        mail:mail,
        password:password
      }
      const isValid= await data.isValid(formData);
      if (isValid)
      {
        setLoading(true)
        axios.post('https://mail-merchant.onrender.com/login',formData)
        .then((response) => {
          setLoading(false)
          Cookies.set('userid',response.data.id)
          setLogged(true)
          window.open('/','_self','noopener,noreferrer');
        })
        .catch((error) => {
          if (error.response.status==401)
          {
            alert("Invalid login")
          }
          if (error.response.status==403)
          {
            alert("Wrong password")
          }
          setLoading(false)
        });
    }
  }

  const login = useGoogleLogin({
    onSuccess: async respose => {
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${respose.access_token}`
                }
            })

            console.log(res.data)
            // loginUser({email:res.data.email,pic:res.data.picture});
        } catch (err) {
            console.log(err)

        }

    }
});


  return (
    <div className='flex w-full justify-center items-center flex-col p-3'>
      <span className='flex text-4xl text-body font-bold p-10'>Log In</span>
      {!loading&&<div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body mx-2 sm:px-10'>
        <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Password</label>
          <div className='flex flex-row justify-end items-center'>
            <input type={pwdvisibility?'text':'password'} className='flex w-full outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPassword(e.target.value)}}/>
            <UilEye className='flex absolute ' onClick={()=>{setPwdVisibility(!pwdvisibility)}}/>
          </div>
          <Link to={'/forgot-password'} className='flex hover:text-body'>Forgot Password?</Link>
          <div className='flex flex-row'>
            <div className='flex bg-zinc-900 rounded-3xl justify-center items-center w-fit mt-2 mx-3 p-3 hover:scale-105 ease-in-out duration-300 cursor-pointer' onClick={login}>
                <img alt='google' src={google} className={`w-10 h-10 object-contain bg-white m-auto rounded-xl`}/>
                <span className='flex pl-3'>Continue with Google</span>
            </div>
        </div>
          <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>LogIn</button>
        </form>
      </div>}
      {loading&&
        <div>
          <PropagateLoader color='#ffffff'/>
        </div>
      }
    </div>
  )
}

export default LogIn