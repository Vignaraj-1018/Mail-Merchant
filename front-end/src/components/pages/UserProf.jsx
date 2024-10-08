import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {PropagateLoader} from 'react-spinners'
import { UilArrow,UilCopy } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../constants'


const UserProf = () => {
    const [loading,setLoading]=useState(true)
    const [verified,setVerified] = useState(true)
    const [mail,setMail] = useState(false)

    const [user,setUser]=useState(null);

    const userId = useSelector((state) => state.user.userId);

    const dispatch = useDispatch();
    

    const getUserDetails = () => {
      axios.post(`${API}/user/${userId}`)
      .then(response =>{
        setUser(response.data);
        setLoading(false);
        setVerified(response.data.verified);
      })
      .catch(err =>{
        if (err.response?.status==401)
        {
          alert("User not found!");
          window.open("/login","_self","noopener,noreferer");
        }
        else
        {
          alert("Error Occured!");
          window.open("/","_self","noopener,noreferer");
          setLoading(false);
        }
      });
    }

    

    useEffect(()=>{
      if (userId){
        getUserDetails();
      }

    }, [userId])

    const customStyle = {
      backgroundColor:"#FF6E31"
    };
    
    const handleCopy=() => {
      let text=`${API}/sendmail/${user._id}`
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
      axios.post(`${API}/mail-verify-request`,{url:window.location.href})
      .then(response =>{
        setLoading(false);
        setMail(true);
      })
      .catch(err =>{console.log(err);setLoading(false);});
    }

    const closeAccount=()=>{
      const conf=prompt("Please Enter 'Delete Account Confirm'\nTo delete the account:")
      if (conf==="Delete Account Confirm")
      {
        axios.post(`${API}/closeaccount`,{id:userId})
        .then(response =>{
          setLoading(false);
          sessionStorage.removeItem('userid');
          dispatch(resetData());
          alert('Your Account has been successfully deleted');
          window.open("/login","_self","noopener,noreferer");
        })
        .catch(err =>{console.log(err);setLoading(false);});
      }

    }

  return (
    <div className='flex w-full'>
      {(!loading && verified)&&
        <div className='flex flex-col justify-center items-center p-10 w-full'>
          <div className='flex flex-col w-full justify-center items-center gap-10'>
            <span className='flex text-3xl text-body'>Welcome, {user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</span>
            <span className='flex text-xl text-white border border-body rounded-lg p-3 shadow-md hover:shadow-lg hover:shadow-body hover:cursor-pointer shadow-body ' onClick={closeAccount}>Close Account</span>
          </div>
          <div className='flex flex-col p-10'>
            <span className='flex text-xl p-5'>Here is your api Link:</span>
            <div className='flex flex-col rounded-xl shadow-lg border border-body shadow-body p-3 w-80 sm:w-full'>
              <div className='flex justify-between w-full'>
                <UilArrow color='#ffffff' className='flex h-8 w-8'/>
                <div className='flex'>
                  <UilCopy color='#ffffff' className='flex h-8 w-8' onClick={handleCopy} />
                </div>
              </div>
              <span className='flex text-lg text-gray-400 p-5 w-full truncate' id='link'>{API}/sendmail/{user?._id}</span>
              <span className='flex text-sm text-white justify-center'><a href='/docs'>Check Docs to Know how it Works! </a></span>
            </div>
          </div>
          <div className='flex flex-col w-full justify-center items-center'>
            <span className='flex text-xl text-body'>Your Mail History from the API</span>
            <div className='flex flex-wrap gap-10 justify-center items-center p-10'>
              {user?.services.map((item,key)=>(
                <div key={key} className='flex flex-col text-white w-80 p-2 border-body border rounded-lg shadow-body shadow-md'  >
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>From:</span> <span className='flex items-center p-1'> {item.name}</span></span>
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>Mail:</span> <span className='flex items-center p-1'> {item.From}</span></span>
                  <span className='flex flex-row p-1 text-justify'><span className='flex text-xl font-semibold'>Subject:</span> <span className='flex items-center p-1'> {item.Subject}</span></span>
                  <span className='flex flex-col p-1 '><span className='flex text-xl font-semibold'>Message:</span> <span className='flex items-center  p-1'> {item.message }</span></span>
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
      {!verified&& !loading &&
        <div className='flex flex-col justify-center items-center w-full'>
          <span className='flex text-3xl text-body py-10'>Please Verify user email to continue with Mail Merchant</span>
          {!mail&&<div className='flex justify-center items-center flex-col'>
            <span className='flex text-xl text-white border border-body rounded-lg p-3 shadow-md hover:shadow-lg hover:shadow-body hover:cursor-pointer shadow-body w-fit' onClick={requestVerification}>Verify Mail</span>
            <span className='flex text-3xl py-10' >Click here to request Verification Mail!</span>
          </div>}
          {mail&&<span className='flex text-3xl py-10 '>Check Your Inbox To Verify Your Email Account!</span>}
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default UserProf