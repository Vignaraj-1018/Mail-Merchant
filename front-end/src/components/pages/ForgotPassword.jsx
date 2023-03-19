import React, { useState } from 'react'
import * as yup from 'yup'
// import { useSignIn } from 'react-auth-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = ({setLogged}) => {

  const [mail,setMail]=useState(null)
  const [pwd1,setPwd1]=useState(null)
  const [pwd2,setPwd2]=useState(null)
  const params=useParams();
  console.log(params)
  console.log(Object.keys(params).length)

  const navigate=useNavigate();

  const data1=yup.object().shape({
    mail:yup.string().email().required(),
    
  })

  const data2=yup.object().shape({
    pwd1:yup.string().required(),
    pwd2:yup.string().required()
    
  })

  const handleSubmit1=async (e) => {
    e.preventDefault()
    console.log(mail);
  
      let formData={
        mail:mail,
        url:window.location.href
      }
      const isValid=await data1.isValid(formData);
      console.log(isValid)
      console.log(formData)
      if (isValid)
      {
        console.log(formData)
        axios.post('https://mail-merchant.onrender.com/forgot-password',formData)
        .then((response) => {console.log(response.data)})
        .catch((error) => {
          console.log('err',error);
          if (error.response.status==401)
          {
            alert("Invalid login")
          }
          else if (error.response.status==500)
          {
            alert("Failed to Send Mail")
          }
        });
    }
  }
  const handleSubmit2=async (e) => {
    e.preventDefault()
    console.log(mail);
  
      let formData={
        pwd1:pwd1,
        pwd2:pwd2
      }
      const isValid=await data2.isValid(formData);
      console.log(isValid)
      console.log(formData)
      if (isValid && formData['pwd1']===formData['pwd2'])
      {
        console.log(formData)
        formData={pwd:formData['pwd1']}
        console.log(formData)
        axios.post(`https://mail-merchant.onrender.com/forgot-password/${params['userid']}`,formData)
        .then((response) => {console.log(response.data)})
        .catch((error) => {
          console.log('err',error);
          if (error.response.status==401)
          {
            alert("Invalid User")
          }
          else if (error.response.status==500)
          {
            alert("Failed to Change Password")
          }
        });
        navigate('/login')
    }
    else
    {
        alert("Invalid Input")
    }
  }

  return (
    <div className='flex h-[90vh] w-full items-center flex-col'>
      <span className='flex text-4xl text-body font-bold p-10'>Change Password</span>
      <div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body px-10'>
        {Object.keys(params).length===0 &&
            <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit1}>
                <label className='flex text-white font-bold'>Mail</label>
                <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
                <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>Send</button>
            </form>
        }

        {Object.keys(params).length!==0&&
            <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit2}>
                <label className='flex text-white font-bold'>New Password</label>
                <input type={'password'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPwd1(e.target.value)}}/>
                <label className='flex text-white font-bold'>Confirm Password</label>
                <input type={'password'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPwd2(e.target.value)}}/>
                <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>Change Password</button>
            </form>
        }

      </div>
      {!params&&<span className='flex p-10 text-2xl'>Check Your Inbox for Check Password Link!</span>}
    </div>
  )
}

export default ForgotPassword