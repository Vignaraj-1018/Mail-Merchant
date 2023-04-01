import React from 'react'
import { mailService } from '../../assets'

const Home = () => {
  return (
    <div className='flex w-full flex-col p-3'>
      <span className='flex text-4xl text-body font-bold p-10 w-full justify-center'>Mail Merchant</span>
      <div className='flex sm:flex-row flex-col w-full text-xl font-semibold'>
        
        <span className='flex flex-col justify-center items-start sm:w-[70%] leading-10'>
          <span>
            Welcome to Mail Merchant, the easy way to send and receive email from your website's contact form. 
          </span>
          <span>
            With our API, you can seamlessly integrate a contact form into your website and receive messages directly in your inbox.
          </span>
          <span>
            Our service is designed to be simple and user-friendly. You don't need any special technical knowledge to get started. Just sign up for an account and follow our easy setup instructions.
          </span>
        </span>
        <img className='flex h-[30rem] sm:w-[30%] brightness-150' src={mailService} /> 
      </div>

      <span className='flex flex-col justify-center items-start  leading-10 text-xl font-semibold'>
        <span className='text-body'>
          Here are just a few of the features you'll enjoy with Mail Merchant:
        </span>
        <li>Simple and easy-to-use API for sending and receiving email</li>
        <li>Customizable contact forms to match your website's design</li>
        <li>Advanced spam filters to keep unwanted messages out of your inbox</li>
        <li>Secure and reliable message delivery</li>
        <li>Affordable pricing with no hidden fees or contracts</li>
        <li>Whether you're a small business owner, a blogger, or anyone else who wants to receive messages from their website visitors, Mail Merchant is the perfect solution. Sign up today and start receiving messages in your inbox right away!</li>
      </span>
    
    </div>
  )
}

export default Home