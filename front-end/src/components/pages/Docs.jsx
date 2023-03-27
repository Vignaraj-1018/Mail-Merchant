import React,{useState} from 'react'
import { UilBars,UilTimes } from '@iconscout/react-unicons'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { exampleCode,reactExampleCode,angularExampleCode,normaljsExampleCode } from '../../constants';

const Docs = () => {
  const [toggle,setToggle]=useState(false);

  

  console.log(toggle)
  return (
    <div className='flex flex-row w-full sm:text-xl text-sm'>
      <div className='flex w-1/6 sm:bg-body'>
        {!toggle&&<div className='flex sm:hidden fixed z-0'>
          <UilBars onClick={()=>{setToggle(true)}}/>
        </div>}
        {toggle&&<div className='flex sm:hidden flex-col fixed bg-body gap-4 p-3'>
          <UilTimes onClick={()=>{setToggle(false)}}/>
          <a href='#intro' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Introduction</div></a>
          <a href='#started' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Getting Started</div></a>
          <a href='#endpoints' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Endpoints</div></a>
          <a href='#eg' onClick={()=>{setToggle(false)}}><div className='flex shadow-lg bg-body p-2'>Examples</div></a>
        </div>}
        <div className='sm:flex hidden flex-col fixed  gap-4 p-5 w-1/6'>
          <a href='#intro'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Introduction</div></a>
          <a href='#started'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Getting Started</div></a>
          <a href='#endpoints'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Endpoints</div></a>
          <a href='#eg'><div className='flex shadow-sm bg-body p-2 hover:shadow-xl w-full'>Examples</div></a>
        </div>
      </div>
      <div className='flex flex-col w-5/6 p-3 sm:ml-10'>
        <span className='flex text-4xl text-body font-bold p-10 w-full justify-center'>Mail Merchant Documentation</span>

        <section id='intro' className='flex flex-col gap-7 py-10 font-semibold sm:w-[90%] text-justify leading-8'>
          <span className='flex text-xl font-bold text-body'>Hello and welcome to Mail Merchant!</span>
          <span>
            The all-in-one <span className='text-body'>unlimited email sending service</span> that can help you manage and send emails from your website contact forms straight to your inbox. With Mail Merchant, you don't have to worry about managing your own email server or dealing with spam filters - <span className='text-body'>we take care of everything for you.</span>
          </span>
          <span>
            Our application is designed to be <span className='text-body'>easy to integrate</span> with your existing website, so you can start sending emails in just a few simple <span className='text-body'>steps. </span>With our powerful email sending API, you can set up your contact forms to send messages directly to your Mail Merchant account, <span className='text-body'>where you can view and respond to them right from your email inbox.</span>
          </span>
          <span>
          To get started, simply sign up for a Mail Merchant account on our website. Once you're signed up, you can start integrating Mail Merchant with your website's contact forms. Our user-friendly documentation makes it easy to get started, and our support team is always available to help if you need any assistance.
          </span>
          <span>
          With Mail Merchant, you can rest assured that your website's contact forms will be <span className='text-body'>reliable, secure, and easy to manage. </span>
          </span>
          <span>
            So why wait? <a href='/signup' className='text-body'>Sign up</a> for Mail Merchant today and start sending emails from your website with confidence.
          </span>
        </section>
        <section id='started' className='flex flex-col gap-7 py-10 font-semibold sm:w-[90%] text-justify leading-8'>
          <span className='flex text-xl font-bold text-body'>Getting Started With Mail Merchant</span>
          <span>
            Ready to get started with Mail Merchant and start sending emails from your website's contact forms? Great! Here's a quick guide to help you get set up:
          </span>
          <span>
            <span className='text-body'>Step 1:</span> Sign up for a Mail Merchant account on our website. Create an account using your email address and other contact information.
          </span>
          <span>
            <span className='text-body'>Step 2:</span> Once you've signed up, you'll need to integrate Mail Merchant with your website's contact forms. Our API documentation provides step-by-step instructions on how to do this, and our support team is always available to help if you run into any issues.
          </span>
          <span>
            <span className='text-body'>Step 3:</span> After you've integrated Mail Merchant with your contact forms, you can start sending emails directly from your website. When a visitor submits a message through your contact form, it will be sent to your Mail Merchant account and delivered to your email inbox.
          </span>
          <span>
            <span className='text-body'>Step 4:</span> To manage your emails, simply log in to your Mail Merchant account and view your email inbox. From here, you can read, respond to, and manage your messages with ease.
          </span>
        </section>
        <section id='endpoints' className='flex flex-col gap-7 py-10 font-semibold sm:w-[90%] text-justify leading-8'>
          <span className='flex text-xl font-bold text-body'>Endpoint of Mail Merchant</span>
          <SyntaxHighlighter language="python" style={vscDarkPlus}>
            {exampleCode}
          </SyntaxHighlighter>

        </section>
        <section id='eg' className='flex flex-col gap-7 py-10 font-semibold sm:w-[90%] text-justify leading-8'>
          <span className='flex text-xl font-bold text-body'>Examples in various Frameworks:</span>
          <span className='flex text-xl font-bold text-body'>ReactJS:</span>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
            {reactExampleCode}
          </SyntaxHighlighter>
          <span className='flex text-xl font-bold text-body'>Angular:</span>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
            {angularExampleCode}
          </SyntaxHighlighter>
          <span className='flex text-xl font-bold text-body'>HTML-CSS-JS:</span>
          <SyntaxHighlighter language="html" style={vscDarkPlus}>
            {normaljsExampleCode}
          </SyntaxHighlighter>
        </section>
      </div>
    </div>
  )
}

export default Docs