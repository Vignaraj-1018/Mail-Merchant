import React, { useState } from 'react'
import * as yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {PropagateLoader} from 'react-spinners'
import { UilEye } from '@iconscout/react-unicons'
import { API } from '../../constants';



const ForgotPassword = ({setLogged}) => {

  const [mail,setMail]=useState(null)
  const [password1,setPassword1]=useState(null)
  const [password2,setPassword2]=useState(null)
  const [loading,setLoading]=useState(false)
  const [pwdvisibility,setPwdVisibility]=useState(false)

  const params=useParams();

  const navigate=useNavigate();

  const data1=yup.object().shape({
    mail:yup.string().email().required(),
    
  })

  const data2=yup.object().shape({
    password1:yup.string().required(),
    password2:yup.string().required()
    
  })

  const handleSubmit1=async (e) => {
    e.preventDefault()
  
      let formData={
        mail:mail,
        url:window.location.href
      }
      const isValid=await data1.isValid(formData);
      if (isValid)
      {
        setLoading(true);
        axios.post(`${API}/forgot-password`,formData)
        .then((response) => { setLoading(false);})
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
          else if (error.response.status==406)
          {
            alert("Please Continue With Google Login!")
          }
        });
    }
  }
  const handleSubmit2=async (e) => {
    e.preventDefault()
  
      let formData={
        password1:password1,
        password2:password2
      }
      const isValid=await data2.isValid(formData);
      if (isValid && formData['password1']===formData['password2'])
      {
        formData={password:formData['password1']}
        setLoading(true)
        axios.post(`${API}/forgot-password/${params['userid']}`,formData)
        .then((response) => {setLoading(false);navigate('/login')})
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
    }
    else
    {
        alert("Invalid Input")
    }
  }

  return (
    <div className='flex h-[90vh] w-full items-center flex-col'>
      <span className='flex text-4xl text-body font-bold p-10'>Change Password</span>
      {!loading&&<><div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body px-10'>
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
                <div className='flex flex-row justify-end items-center'>
                  <input type={pwdvisibility?'text':'password'} className='flex w-full outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPassword1(e.target.value)}}/>
                  <UilEye className='flex absolute ' onClick={()=>{setPwdVisibility(!pwdvisibility)}}/>
                </div>
                <label className='flex text-white font-bold'>Confirm Password</label>
                <div className='flex flex-row justify-end items-center'>
                  <input type={pwdvisibility?'text':'password'} className='flex w-full outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPassword2(e.target.value)}}/>
                  <UilEye className='flex absolute ' onClick={()=>{setPwdVisibility(!pwdvisibility)}}/>
                </div>
                <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>Change Password</button>
            </form>
        }

      </div>
      {!params&&<span className='flex p-10 text-2xl'>Check Your Inbox for Check Password Link!</span>}
      </>
      }
      {loading&&
        <div className='flex justify-center items-center w-full'>
          <PropagateLoader color='#ffffff'/>
        </div>
      }
    </div>
  )
}

export default ForgotPassword