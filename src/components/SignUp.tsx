"use client"
import React, { useState } from 'react'

const SignUp = ({setSignUpVisible} : { setSignUpVisible : React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [firstName,setFirstNameValue] = useState<string>('');
  const [lastName,setLastNameValue] = useState('');
  const [email,setEmailValue] = useState('');
  const [phone,setPhoneValue] = useState('');
  const [password,setPasswordValue] = useState('');


  
  

  const saveUser = async (event: React.FormEvent) => {
    event.preventDefault(); 

    try {
      const response = await fetch('/api/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to register user');

      alert(data.message);
      setSignUpVisible(false);

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };
  return (
    <div className='z-10 flex flex-col justify-between items-center h-[400px] w-[500px] bg-slate-500 rounded-2xl'>
      <h1 className='text-2xl'>Registration</h1>
      <form onSubmit={saveUser} className='text-white flex flex-col gap-[20px] mb-[20px]'>
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='First name' type='text' value={firstName} onChange={(e) => setFirstNameValue(e.target.value)} />
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Last name' type='text' value={lastName} onChange={(e) => setLastNameValue(e.target.value)} />
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Email' type='text' value={email} onChange={(e) => setEmailValue(e.target.value)} />
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Phone' type='text' value={phone} onChange={(e) => setPhoneValue(e.target.value)} />
        <input className='rounded-lg w-[200px] bg-slate-700' placeholder='Password' type='password' value={password} onChange={(e) => setPasswordValue(e.target.value)} />
        <button type="submit" className='bg-gray-500 ml-auto mr-auto w-[100px] h-[40px] rounded-md border-solid border-slate-500'>Register</button>
      </form>
    </div>
  );
}

export default SignUp