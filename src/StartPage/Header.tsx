'use client'
import React from 'react'
import SignUp from '../components/SignUp'
import LogIn from '../components/LogIn'
import { useState } from 'react';
const Header = () => {
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isLogInVisible, setLogInVisible] = useState(false);


  const togglePopUpSignUp = () => {
    setSignUpVisible(!isSignUpVisible);
    if(isLogInVisible)
    {
      setLogInVisible(!isLogInVisible);
    }

  }
  const togglePopUpLogIn = () => {
    setLogInVisible(!isLogInVisible);
    if(isSignUpVisible)
      {
        setSignUpVisible(!isSignUpVisible);
      }
  }
  return (
    <>
    <header className='  flex items-center fixed left-0 top-0 bg-black w-screen h-[40px]'>
      <button className=' fixed ml-[1%] z-0 bg-slate-500 w-[100px] rounded-md border-solid border-white p-0.5' onClick={togglePopUpSignUp}>Sign in</button>
      <button className=' fixed  ml-[8%] z-0 bg-slate-500 w-[100px] rounded-md border-solid border-white p-0.5' onClick={togglePopUpLogIn}>Log in</button>
    
      <h1 className='text-xl ml-auto mr-auto '>𝓦𝓸𝓻𝓴𝓮𝓻</h1>
    </header>
    
    {isSignUpVisible && <SignUp setSignUpVisible={setSignUpVisible}/> }
    {isLogInVisible && <LogIn setSignInVisible={setLogInVisible}/>}

    </>
    
)
}

export default Header