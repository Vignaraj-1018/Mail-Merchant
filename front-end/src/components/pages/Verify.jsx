import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {PropagateLoader} from 'react-spinners'
import axios from 'axios'
import { API } from '../../constants'


const Verify = () => {

    const params=useParams();
    const [loading,setLoading]=useState(true)
    const [verified,setVerified] = useState(false)

    useEffect(()=>{
      axios.post(`${API}/mail-verify-request/${params.userid}`)
      .then(response =>{
        setLoading(false);
        setVerified(true);
      })
      .catch(err =>{console.log(err)});
    },[]);
    
  return (
    <div className='flex w-full'>
        {verified && 
        <div className='flex flex-col justify-center items-center p-10 w-full'>
          <div className='flex flex-col justify-center items-center w-full'>
            <span className='flex text-3xl text-body py-10'>Mail Verification Successfull!</span>
            <a className='flex text-3xl py-10 cursor-pointer' href={`/user/${params.userid}`}>Click here to Go Back!</a>  
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