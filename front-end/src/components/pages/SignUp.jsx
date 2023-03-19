import React,{useState} from 'react'
import * as yup from 'yup'
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({setLogged}) => {
  const [mail,setMail]=useState(null)
  const [name,setName]=useState(null)
  const [pwd,setPwd]=useState(null)
  const [id,setId]=useState(null)

  const signIn=useSignIn();
  const navigate=useNavigate();

  const data=yup.object().shape({
    mail:yup.string().email().required(),
    name:yup.string().required(),
    pwd:yup.string().required()
  })

  const handleSubmit=async (e) => {
    e.preventDefault()
    console.log(mail,name,pwd);
  
      let formData={
        mail:mail,
        name:name,
        pwd:pwd
      }
      const isValid=await data.isValid(formData);
      console.log(isValid)
      console.log(formData)
      if (isValid)
      {
        axios.post('https://mail-merchant.onrender.com/signup',formData)
        .then((response) => {setId(response.data.id);console.log(id);})
        .catch((error) => {console.log(error);});
        
        console.log("loggedin");
        if(id){
          console.log(id)
          signIn({
          token:id,
          expiresIn:'3600',
          tokenType:'Bearer',
          authState:formData,
          })
          setLogged(true)
          navigate('/');
        }
    }
  }

  return (
    <div className='flex h-[90vh] w-full justify-center items-center flex-col'>
      <span className='flex text-4xl text-body font-bold p-10'>Sign Up</span>
      <div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body px-10'>
        <form className='flex gap-4 flex-col p-10' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Name</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setName(e.target.value)}}/>
          <label className='flex text-white font-bold'>Password</label>
          <input type={'password'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setPwd(e.target.value)}}/>
          <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp