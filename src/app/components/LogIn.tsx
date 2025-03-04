"use client";
import React, { useState } from 'react';

const SignIn = ({ setSignInVisible }: { setSignInVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Fetch request sent! Waiting for response...");
  
      const text = await response.text();
      console.log("Raw response from server:", text);
  
      const data = JSON.parse(text);
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }
  
      alert("Login successful!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className='z-10 flex flex-col justify-between items-center h-[300px] w-[400px] bg-slate-500 rounded-2xl'>
      <h1 className='text-2xl'>Sign In</h1>
      <form onSubmit={handleSignIn} className='text-white flex flex-col gap-[20px]'>
        <input className='rounded-lg w-[250px] bg-slate-700' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='rounded-lg w-[250px] bg-slate-700' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button  className='bg-gray-500 w-[100px] h-[40px] rounded-md border-solid border-slate-500'>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;