import React, { useState } from 'react'
import * as yup from 'yup'
// import { useSignIn } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const LogIn = ({setLogged}) => {

  const [mail,setMail]=useState(null)
  const [pwd,setPwd]=useState(null)
  const [id,setId]=useState(null)

  // const signIn=useSignIn();
  const navigate=useNavigate();

  const data=yup.object().shape({
    mail:yup.string().email().required(),
    pwd:yup.string().required()
  })

  const handleSubmit=async (e) => {
    e.preventDefault()
    console.log(mail,pwd);
  
      let formData={
        mail:mail,
        pwd:pwd
      }
      const isValid=await data.isValid(formData);
      console.log(isValid)
      console.log(formData)
      if (isValid)
      {
        
        axios.post('https://mail-merchant.onrender.com/login',formData)
        .then((response) => {setId(response.data.id);console.log(response,response.data.id);})
        .catch((error) => {
          console.log('err',error);
          if (error.response.status==401)
          {
            alert("Invalid login")
          }
        });
        
        console.log("loggedin");
        console.log(id)
        if(id){
          // signIn({
          // token:id,
          // expiresIn:'3600',
          // tokenType:'Bearer',
          // authState:formData,
          // })
          Cookies.set('userid',id)
          setLogged(true)
          navigate('/');
        }
    }
  }

  return (
    <div className='flex h-[90vh] w-full justify-center items-center flex-col'>
      <span className='flex text-4xl text-body font-bold p-10'>Log In</span>
      <div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body px-10'>
        <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Password</label>
          <input type={'password'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPwd(e.target.value)}}/>
          <Link to={'/forgot-password'} className='flex hover:text-body'>Forgot Password?</Link>
          <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>LogIn</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn