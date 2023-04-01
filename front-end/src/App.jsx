import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contact, Docs, Footer, ForgotPassword, Home, LogIn, Navbar, NotFound, SignUp, UserProf, Verify } from './components'
import Cookies from 'js-cookie'

function App() {
  const [logged,setLogged] =useState(false)
  const [cookie,setCookie] = useState(null)

  useEffect(()=>{
    let ck=Cookies.get()
    if (ck.userid)
    {
      setCookie(ck)
      setLogged(true);
    }
  },[]);

  return (
    <div className="flex flex-col h-screen bg-header overflow-y-auto justify-between">
      <div className='flex fixed w-full z-20'> 
        <Navbar className='flex' logged={logged} setLogged={setLogged} cookie={cookie}/>
      </div>
      <div className='flex text-white mt-20 px-5'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/docs' element={<Docs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<LogIn setLogged={setLogged}/>}/>
          <Route path='/signup' element={<SignUp setLogged={setLogged}/>}/>
          <Route path='/user/:userid' element={<UserProf/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/forgot-password/:userid' element={<ForgotPassword/>}/>
          <Route path='/user/:userid/mail-verify' element={<Verify/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer className='flex'/>
    </div>
  )
}

export default App
