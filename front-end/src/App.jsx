import React,{useState,useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Contact, Docs, Footer, ForgotPassword, Home, LogIn, Navbar, NotFound, SignUp, UserProf, Verify } from './components'
import axios from 'axios'
import { myHelperBackendAPI } from './constants'
import { setUserId } from './redux/DataSlice';

function App() {
  const [logged,setLogged] =useState(false)
  const dispatch = useDispatch();

  useEffect(()=>{
    let ck=sessionStorage.getItem("userid")
    if (ck)
    {
      setLogged(true);
      dispatch(setUserId(ck));
    }
    if (window.sessionStorage.getItem("viewAnalyticsSent")){
      // console.log("old Session");
    }
    else{
      window.sessionStorage.setItem("viewAnalyticsSent",true);
      // console.log("new Session");
      let data = {
        name: "Mail Merchant Website",
        url:"https://mail-merchant.vignaraj.in/"
      }
      let url = myHelperBackendAPI + "/my_website_analytics/website_view";
      axios.post(url,data)
      .then((resp)=>{
        // console.log(resp);
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  },[]);

  return (
    <div className="flex flex-col h-screen bg-header overflow-y-auto justify-between">
      <div className='flex fixed w-full z-20'> 
        <Navbar className='flex' logged={logged} setLogged={setLogged}/>
      </div>
      <div className='flex text-white mt-20 px-5'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/docs' element={<Docs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<LogIn setLogged={setLogged}/>}/>
          <Route path='/signup' element={<SignUp setLogged={setLogged}/>}/>
          <Route path='/user' element={<UserProf/>}/>
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
