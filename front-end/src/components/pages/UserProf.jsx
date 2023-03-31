import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {PropagateLoader} from 'react-spinners'
import { UilArrow,UilCopy } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UserProf = () => {
    const params = useParams()
    const [loading,setLoading]=useState(true)
    const [verified,setVerified] = useState(true)
    const [mail,setMail] = useState(false)

    const [user,setUser]=useState(null);
    useEffect(()=>{
      axios.post(`https://mail-merchant.onrender.com/user/${params.userid}`)
      .then(response =>{
        setUser(response.data);
        setLoading(false);
        setVerified(response.data.verified);
      })
      .catch(err =>{console.log(err)});
    },[])
    const customStyle = {
      backgroundColor:"#FF6E31"
    };
    const handleCopy=() => {
      let text=`https://mail-merchant.onrender.com/sendmail/${user._id}`
      navigator.clipboard.writeText(text)
      toast.success('Code Copied!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressStyle: customStyle,
        });
    }

    const requestVerification=()=>{
      setLoading(true);
      console.log(window.location.href);
      axios.post(`https://mail-merchant.onrender.com/mail-verify-request`,{url:window.location.href})
      .then(response =>{
        console.log(response.data);
        setLoading(false);
        setMail(true)
      })
      .catch(err =>{console.log(err);setLoading(false);});
      // window.open('http://localhost:5173/user/6422810cdf1e51903d399759/mail-verify','_self','noopener,norefferer');

    }

    console.log(user)
    console.log(verified)
  return (
    <div className='flex w-full'>
      {(!loading && verified)&&
        <div className='flex flex-col justify-center items-center p-10 w-full'>
          <span className='flex text-3xl text-body'>Welcome, {user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</span>
          <div className='flex flex-col p-10'>
            <span className='flex text-xl p-5'>Here is your api Link:</span>
            <div className='flex flex-col rounded-xl shadow-lg border border-body shadow-body p-3 w-80 sm:w-full'>
              <div className='flex justify-between w-full'>
                <UilArrow color='#ffffff' className='flex h-8 w-8'/>
                <div className='flex'>
                  <UilCopy color='#ffffff' className='flex h-8 w-8' onClick={handleCopy} />
                </div>
              </div>
              <span className='flex text-lg text-gray-400 p-5 w-full truncate' id='link'>https://mail-merchant.onrender.com/sendmail/{user._id}</span>
              <span className='flex text-sm text-white justify-center'><a href='/docs'>Check Docs to Know how it Works! </a></span>
            </div>
          </div>
          <div className='flex flex-col w-full justify-center items-center'>
            <span className='flex text-xl text-body'>Your Mail History from the API</span>
            <div className='flex flex-wrap gap-10 justify-center items-center p-10'>
              {user.services.map((item)=>(
                <div className='flex flex-col text-white w-80 p-2 border-body border rounded-lg shadow-body shadow-md'  >
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>From:</span> <span className='flex items-center p-1'> {item.name}</span></span>
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>Mail:</span> <span className='flex items-center p-1'> {item.From}</span></span>
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>Subject:</span> <span className='flex items-center p-1'> {item.Subject}</span></span>
                  <span className='flex flex-col p-1 '><span className='flex text-xl font-semibold'>Message:</span> <span className='flex items-center  p-1'> {item.msg }</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      {loading &&
        <div className='flex justify-center items-center w-full'>
          <PropagateLoader color='#ffffff'/>
        </div>
      }
      {!verified&&
        <div className='flex flex-col justify-center items-center w-full'>
          <span className='flex text-3xl text-body py-10'>Please Verify user email to continue with Mail Merchant</span>
          {!mail&&<span className='flex text-3xl py-10 cursor-pointer' onClick={requestVerification}>Click here to request Verification Mail!</span>}
          {mail&&<span className='flex text-3xl py-10 cursor-pointer'>Check Your Inbox To Verify Your Email Account!</span>}
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default UserProf