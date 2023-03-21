import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { navLinks } from '../constants'
import { UilUser } from '@iconscout/react-unicons'
import { Link,useNavigate } from 'react-router-dom'
// import { useSignOut } from 'react-auth-kit';
import Cookies from 'js-cookie'

const Navbar = ({logged,setLogged,cookie}) => {

    // const signOut=useSignOut();
    const navigate=useNavigate();
    
    const logOut=()=>{
        // signOut();
        Cookies.remove('userid')
        setLogged(false);
        navigate('/login');
    }

    

  return (
    <div className='flex w-full h-20 px-10 bg-header justify-between items-center'>
        <Link to={'/'}><img src={logo} className='flex h-14 w-60 hover:cursor-pointer'/></Link>
        <div className='flex'>
            <ul className='flex flex-row text-white font-bold text-xl items-center gap-7'>
                {navLinks.map((item)=>(
                    <Link to={item.link} key={item.id}><li className='flex px-7 hover:text-body hover:cursor-pointer'>{item.title}</li></Link>
                ))}
                {!logged && 
                    <div className='flex gap-7 items-center'>
                        <Link to={'/login'}><Button varient='outline' className='flex' sx={{color:'#ffffff', ":hover":{backgroundColor:"#FF6E31"}}}>Sign In</Button></Link>
                        <Link to={'/signup'}><Button varient='outline' className='flex' sx={{color:'#ffffff', backgroundColor:"#FF6E31",":hover":{backgroundColor:"#FF6E31"}}}>Sign Up</Button></Link>
                    </div>
                }
                {logged && 
                    <>
                        <Link to={`/user/${cookie?.userid}`}><UilUser/></Link>
                        <Button varient='outline' className='flex' sx={{color:'#ffffff', ":hover":{backgroundColor:"#FF6E31"}}} onClick={logOut}>Sign Out</Button>
                    </>
                }
            </ul>
        </div>
    </div>
  )
}

export default Navbar