import React,{useState} from 'react'
import * as yup from 'yup'
// import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PropagateLoader } from 'react-spinners';

const SignUp = ({setLogged}) => {
  const [mail,setMail]=useState(null)
  const [name,setName]=useState(null)
  const [pwd,setPwd]=useState(null)
  const [id,setId]=useState(null)

  const [loading,setLoading]=useState(false)

  // const signIn=useSignIn();
  const navigate=useNavigate();

  const data=yup.object().shape({
    mail:yup.string().email().required(),
    name:yup.string().required(),
    pwd:yup.string().required()
  })

  const handleSubmit=async (e) => {
    e.preventDefault()
    // console.log(mail,name,pwd);
  
      let formData={
        mail:mail,
        name:name,
        pwd:pwd
      }
      const isValid=await data.isValid(formData);
      // console.log(isValid)
      // console.log(formData)
      if (isValid)
      {
        setLoading(true)
        axios.post('https://mail-merchant.onrender.com/signup',formData)
        .then((response) => {
          setId(response.data.id);
          // console.log(id);
          setLoading(false)
          Cookies.set('userid',response.data.id)
          setLogged(true)
          navigate('/');
        })
        .catch((error) => {
          // console.log('err',error);
          if (error.response.status==409)
          {
            alert("User Already Registered")
          }
          setLoading(false)
        });
        
        // console.log("loggedin");
        // if(id){
        //   console.log(id)
          // signIn({
          // token:id,
          // expiresIn:'3600',
          // tokenType:'Bearer',
          // authState:formData,
          // })
          // Cookies.set('userid',id)
          // setLogged(true)
          // navigate('/');
        // }
    }
  }

  return (
    <div className='flex w-full justify-center items-center flex-col'>
      <span className='flex text-4xl text-body font-bold p-10'>Sign Up</span>
      {!loading&&<div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body px-10'>
        <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Name</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setName(e.target.value)}}/>
          <label className='flex text-white font-bold'>Password</label>
          <input type={'password'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPwd(e.target.value)}}/>
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