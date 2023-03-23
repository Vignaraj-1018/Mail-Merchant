import React,{useState} from 'react'
import { UilBars,UilTimes } from '@iconscout/react-unicons'


const Docs = () => {
  const [toggle,setToggle]=useState(false)

  console.log(toggle)
  return (
    <div className='flex flex-row h-screen w-full'>
      <div className='flex w-1/6 sm:bg-body'>
        {!toggle&&<div className='flex sm:hidden fixed'>
          <UilBars onClick={()=>{setToggle(true)}}/>
        </div>}
        {toggle&&<div className='flex sm:hidden flex-col fixed bg-body gap-4 p-3'>
          <UilTimes onClick={()=>{setToggle(false)}}/>
          <a href='#intro' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Introduction</div></a>
          <a href='#started' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Getting Started</div></a>
          <a href='#endpoints' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Endpoints</div></a>
          <a href='#authn' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Authentication</div></a>
          <a href='#eg' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Examples</div></a>
        </div>}
        <div className='sm:flex hidden flex-col fixed  gap-4 p-5 w-1/6'>
          <a href='#intro'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Introduction</div></a>
          <a href='#started'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Getting Started</div></a>
          <a href='#endpoints'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Endpoints</div></a>
          <a href='#authn'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Authentication</div></a>
          <a href='#eg'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Examples</div></a>
        </div>
      </div>
      <div className='flex flex-col w-5/6 p-3'>
        <section id='intro' className='flex'>Introduction</section>
        <section id='started' className='flex'>Getting Started</section>
        <section id='endpoints' className='flex'>Endpoints</section>
        <section id='authn' className='flex'>Authentication</section>
        <section id='eg' className='flex'>Examples</section>
      </div>
    </div>
  )
}

export default Docs