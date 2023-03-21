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
    // console.log('ck',ck);
    if (ck.userid)
    {
      setCookie(ck)
      // console.log(ck);
      setLogged(true);
      // console.log("Cookie Available")
      // console.log(cookie);
    }
  },[]);

  return (
    <div className="flex flex-col h-screen bg-header overflow-y-auto justify-between">
      <div className='flex fixed w-full'> 
        <Navbar className='flex' logged={logged} setLogged={setLogged} cookie={cookie}/>
      </div>
      <div className='flex text-white my-20 px-5'>
        <Routes>
          <Route path='/' element={<Home cookie={cookie}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/docs' element={<Docs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<LogIn setLogged={setLogged}/>}/>
          <Route path='/signup' element={<SignUp setLogged={setLogged}/>}/>
          <Route path='/user/:userid' element={<UserProf/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/forgot-password/:userid' element={<ForgotPassword/>}/>
        </Routes>
      </div>
      <Footer className='flex'/>
    </div>
  )
}

export default App
