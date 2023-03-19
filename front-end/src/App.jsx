import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { About, Contact, Docs, Footer, ForgotPassword, Home, LogIn, Navbar, SignUp, UserProf } from './components'
import Cookies from 'js-cookie'

function App() {
  const [logged,setLogged] =useState(false)
  const [cookie,setCookie] = useState(null)
  console.log(logged)

  useEffect(()=>{
    let ck=Cookies.get()
    // console.log(ck);
    if (ck.user)
    {
      setCookie(ck)
      console.log(ck);
      setLogged(true);
      console.log("Cookie Available")
      console.log(cookie);
    }
  },[]);

  return (
    <div className="flex flex-col">
      <div className='flex fixed w-full'> 
        <Navbar className='flex' logged={logged} setLogged={setLogged} cookie={cookie}/>
      </div>
      <div className='flex bg-header text-white mt-20'>
        <Routes>
          <Route path='/' element={<Home cookie={cookie}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/docs' element={<Docs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<LogIn setLogged={setLogged}/>}/>
          <Route path='/signup' element={<SignUp setLogged={setLogged}/>}/>
          <Route path='/user/:userid' element={<UserProf/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/forgotpassword/:userid' element={<ForgotPassword/>}/>
        </Routes>
      </div>
      <Footer className='flex min-h-screen'/>
    </div>
  )
}

export default App
