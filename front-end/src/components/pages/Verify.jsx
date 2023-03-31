import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {PropagateLoader} from 'react-spinners'
import axios from 'axios'


const Verify = () => {

    const params=useParams();
    const [loading,setLoading]=useState(true)
    const [verified,setVerified] = useState(false)

    useEffect(()=>{
      axios.post(`https://mail-merchant.onrender.com/mail-verify-request/${params.userid}`)
      .then(response =>{
        console.log(response.data);
        setLoading(false);
        setVerified(true);
      })
      .catch(err =>{console.log(err)});
    },[]);
    
  return (
    <div className='flex w-full'>
        {verified && 
        <div className='flex flex-col justify-center items-center p-10 w-full'>
          {/* <span className='flex text-3xl text-body'>Welcome, {user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</span> */}
          <div className='flex flex-col justify-center items-center w-full'>
            <span className='flex text-3xl text-body py-10'>Mail Verification Successfull!</span>
            <span className='flex text-3xl py-10 cursor-pointer'>Click here to Go Back!</span>
          </div>
        </div>}
        {loading &&
          <div className='flex justify-center items-center w-full'>
            <PropagateLoader color='#ffffff'/>
          </div>
        }
    </div>
  )
}

export default Verify