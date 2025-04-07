"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const SignIn = ({ setSignInVisible }: { setSignInVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/HomePage/");
  }

  const handleSignIn = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      const response = await fetch('/api/logIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Fetch request sent! Waiting for response...");
  
      const text = await response.text();
      console.log("Raw response from server:", text);
  
      const data = JSON.parse(text);
  
      if (text.includes("error")) {
        alert("Invalid email or password");
      } else {
        alert("Login successful!");
        // Store user information in cookies
        Cookies.set('user', JSON.stringify(data), { expires: 7 }); // Expires in 7 days
        setSignInVisible(false);
        handleNavigate();
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className='z-10 flex flex-col items-center h-[400px] w-[500px] bg-slate-500 rounded-2xl'>
      <h1 className='mb-[100px] text-2xl'>Sign In</h1>
      <form onSubmit={handleSignIn} className='text-white flex flex-col gap-[20px]'>
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-gray-500 ml-auto mr-auto w-[100px] h-[40px] rounded-md border-solid border-slate-500'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;