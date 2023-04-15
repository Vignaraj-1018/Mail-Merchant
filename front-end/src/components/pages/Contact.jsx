import React,{useState,useRef} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import {PropagateLoader} from 'react-spinners'

const Contact = () => {
  const [name,setName]=useState(null)
  const [mail,setMail]=useState(null)
  const [subject,setSubject]=useState(null)
  const [message,setMessage]=useState(null)

  const [loading, setLoading]=useState(false)

  
  const data=yup.object().shape({
    mail:yup.string().email().required(),
    name:yup.string().required(),
    subject:yup.string().required(),
    message:yup.string().required()
  })

  const apiUrl = import.meta.env.VITE_CONTACT_URL;
  
  
  const handleSubmit= async (e) => {
    e.preventDefault()
    let formData={
      mail:mail,
      name:name,
      subject:subject,
      message:message
    }
    const isValid= await data.isValid(formData);
    // console.log(isValid);
    if (isValid)
    {
      setLoading(true)
      axios.post(apiUrl,formData)
      .then((response) => {
        // console.log(response.data);
        setLoading(false)
      })
      .catch((error) => {
        if (error.response.status==500)
        {
          alert("Failed to Send Mail!")
        }
      });
    }
  }
  return (
    <div className='flex w-full justify-center items-center flex-col p-3'>
      <span className='flex text-4xl text-body font-bold p-10 w-full justify-center'>Contact Developer</span>
      {!loading&&<div className='flex border-2 border-body border-opacity-50 rounded-2xl shadow-lg shadow-body mx-2 sm:px-5 sm:w-[30%]'>
        <form className='flex gap-4 flex-col p-10 w-full' onSubmit={handleSubmit}>
          <label className='flex text-white font-bold'>Name</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg ' onChange={e=>{setName(e.target.value)}}/>
          <label className='flex text-white font-bold'>Mail</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMail(e.target.value)}}/>
          <label className='flex text-white font-bold'>Subject</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setSubject(e.target.value)}}/>
          <label className='flex text-white font-bold'>Message</label>
          <input type={'text'} className='flex outline-none text-white bg-black border-b-2 border-body p-3 border-opacity-50 text-lg' onChange={e=>{setMessage(e.target.value)}}/>
          <button type='submit' className='flex m-3 text-white border-2 rounded-full border-body p-3 border-opacity-50 justify-center shadow-body shadow-sm hover:shadow-md hover:shadow-body'>Send</button>
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

export default Contact