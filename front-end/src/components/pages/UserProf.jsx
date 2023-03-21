import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const UserProf = () => {
    const params = useParams()
    // console.log(params)

    const [user,setUser]=useState(null);
    useEffect(()=>{
      axios.post(`https://mail-merchant.onrender.com/user/${params.userid}`)
      .then(response =>{setUser(response.data);})
      .catch(err =>{console.log(err)});
    },[])

    // console.log(user)
  return (
    <div className='flex flex-col w-full justify-center items-center p-10'>
      <span className='flex text-3xl text-body'>Welcome, {user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</span>
    </div>
  )
}

export default UserProf