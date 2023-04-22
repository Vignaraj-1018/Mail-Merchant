import React,{useState} from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PropagateLoader } from 'react-spinners';
import { UilEye } from '@iconscout/react-unicons'
import { API } from '../../constants';
import { useGoogleLogin } from '@react-oauth/google';
import { google } from '../../assets';

const SignUp = ({setLogged}) => {
  const [mail,setMail]=useState(null)
  const [name,setName]=useState(null)
  const [password,setPassword]=useState(null)
  const [password2,setPassword2]=useState(null)
  const [pwdvisibility,setPwdVisibility]=useState(false)

  const [loading,setLoading]=useState(false)

  const navigate=useNavigate();

  const data=yup.object().shape({
    mail:yup.string().email().required(),
    name:yup.string().required(),
    password:yup.string().required()
  })

  const handleSubmit=async (e) => {
    e.preventDefault()
  
      let formData={
        mail:mail,
        name:name,
        password:password,
        password2:password
      }
      const isValid=await data.isValid(formData);
      if (isValid && password === password2)
      {
        setLoading(true)
        axios.post(`${API}/signup`,formData)
        .then((response) => {
          setLoading(false)
          Cookies.set('userid',response.data.id,{expires:1})
          setLogged(true)
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status==409)
          {
            alert("User Already Registered")
          }
          setLoading(false)
        });
        
    }
    else if(password!==password2)
    {
      alert("Check your password, Mismatched!")
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

            Cookies.set("pic",res.data.picture,{expires:1});
            setLoading(true);
            axios.post(`${API}/g/signup`,{mail:res.data.email,name:res.data.name})
              .then((response) => {
                setLoading(false)
                Cookies.set('userid',response.data.id,{expires:1})
                setLogged(true)
                navigate('/');
              })
              .catch((error) => {
                if (error.response.status==409)
                {
                  alert("User Already Registered")
                }
                setLoading(false)
              });
          } catch (err) {
              console.log(err)

          }

        }
      });

  return (
    <div className='flex w-full justify-center items-center flex-col p-10'>
      <span className='flex text-4xl text-body font-bold p-10'>Sign Up</span>
      {!loading&&<div className='flex flex-col gap-5 justify-center items-center p-5 border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body mx-2 sm:px-10'>
        <div className='flex flex-row'>
          <div className='flex bg-zinc-900 rounded-3xl justify-center items-center w-fit mt-2 mx-3 p-3 hover:scale-105 ease-in-out duration-300 cursor-pointer' onClick={login}>
              <img alt='google' src={google} className={`w-10 h-10 object-contain bg-white m-auto rounded-xl`}/>
              <span className='flex pl-3 text-body'>Continue with Google</span> 
          </div>
        </div>
        <span className='flex justify-center items-center w-full text-body'>Or</span>
        <form className='flex gap-4 flex-col p-5' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Name</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setName(e.target.value)}}/>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Password</label>
          <div className='flex flex-row justify-end items-center'>
            <input type={pwdvisibility?'text':'password'} className='flex w-full outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPassword(e.target.value)}}/>
            <UilEye className='flex' onClick={()=>{setPwdVisibility(!pwdvisibility)}}/>
          </div>
          <label className='flex text-white font-bold'>Confirm Password</label>
          <div className='flex flex-row justify-end items-center'>
            <input type={pwdvisibility?'text':'password'} className='flex w-full outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPassword2(e.target.value)}}/>
            <UilEye className='flex ' onClick={()=>{setPwdVisibility(!pwdvisibility)}}/>
          </div>

          <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>Sign Up</button>
        </form>
      </div>}
      {loading && 
      <div>
        <PropagateLoader color='#ffffff'/>
      </div>
      }
    </div>
  )
}

export default SignUp