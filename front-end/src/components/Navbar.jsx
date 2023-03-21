import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { navLinks } from '../constants'
import { UilUser,UilBars,UilTimes } from '@iconscout/react-unicons'
import { Link,useNavigate } from 'react-router-dom'
// import { useSignOut } from 'react-auth-kit';
import Cookies from 'js-cookie'

const Navbar = ({logged,setLogged,cookie}) => {

    // const signOut=useSignOut();
    const navigate=useNavigate();

    const [toggle,setToggle]=useState(false)
    
    const logOut=()=>{
        // signOut();
        Cookies.remove('userid')
        setLogged(false);
        setToggle(false);
        navigate('/login');
    }

    

  return (
    <div className='flex w-full h-20 px-10 bg-header justify-between items-center'>
        <Link to={'/'}><img src={logo} className='flex h-14 w-60 hover:cursor-pointer'/></Link>
        <div className='sm:flex hidden'>
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
                        <a href={`/user/${cookie?.userid}`}><UilUser/></a>
                        <Button varient='outline' className='flex' sx={{color:'#ffffff', ":hover":{backgroundColor:"#FF6E31"}}} onClick={logOut}>Sign Out</Button>
                    </>
                }
            </ul>
        </div>
        <div className='flex sm:hidden'>
            <UilBars className='flex text-white h-7 w-7' onClick={()=>{setToggle(true)}} />
            {toggle&&
            <div className='flex flex-col h-screen w-screen absolute bg-body left-0 top-0 p-10'>
                <div className='flex flex-row w-full justify-between items-start'>
                    <Link to={'/'}><img src={logo} className='flex h-14 w-60 hover:cursor-pointer'/></Link>
                    <UilTimes className='flex text-white h-10 w-10' onClick={()=>{setToggle(false)}}/>
                </div>
                <ul className='flex flex-col text-white font-bold text-xl items-center gap-7 p-10'>
                    {navLinks.map((item)=>(
                        <Link to={item.link} key={item.id} onClick={()=>{setToggle(false)}}><li className='flex px-7 hover:cursor-pointer'>{item.title}</li></Link>
                    ))}
                    {!logged && 
                        <div className='flex gap-7 items-center'>
                            <Link to={'/login'}><Button varient='outline' className='flex' sx={{color:'#000000', backgroundColor:"#ffffff"}} onClick={()=>{setToggle(false)}}>Sign In</Button></Link>
                            <Link to={'/signup'}><Button varient='outline' className='flex' sx={{color:'#000000', backgroundColor:"#ffffff"}} onClick={()=>{setToggle(false)}}>Sign Up</Button></Link>
                        </div>
                    }
                    {logged && 
                        <>
                            <a href={`/user/${cookie?.userid}`} onClick={()=>{setToggle(false)}}><UilUser/></a>
                            <Button varient='outline' className='flex' sx={{color:'#ffffff', ":hover":{backgroundColor:"#FF6E31"}}} onClick={logOut} >Sign Out</Button>
                        </>
                    }
                </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar