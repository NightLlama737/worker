"use client"
import React, { useState } from 'react'
import SettingPasswordPopUp from './SetingPassword'
import createUser from '@/database/createUser'

const SignUp = ({setSignUpVisible} : { setSignUpVisible : React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [isSettingPasswordPopUpVisible, setSettingPasswordPopUpVisible] = useState(false);
  const [firstName,setFirstNameValue] = useState("");
  const [lastName,setLastNameValue] = useState("");
  const [email,setEmailValue] = useState("");
  const [phone,setPhoneValue] = useState("");
  const [worker_Id,setWorkerIdValue] = useState("");

  const togglePopUpSignUp = () => {
    setSettingPasswordPopUpVisible(!isSettingPasswordPopUpVisible);
    
  }

  const firstNameHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(event.target.value); 
  };

  const lastNameHandleleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(event.target.value);
  };
  const emailHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const phoneHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value); 
  };
  const workerIdHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkerIdValue(event.target.value); 
  };

  const saveUser = () => {
    createUser({firstName,lastName,email,phone,worker_Id})

  }
  return (
    <div  className=' f z-10 flex-col relative flex justify-between items-center    h-[400px] w-[500px] bg-slate-500 rounded-2xl'>
            
            {isSettingPasswordPopUpVisible ? 
            <>
            <SettingPasswordPopUp setSettingPasswordPopUpVisible={setSettingPasswordPopUpVisible} setSignUpVisible={setSignUpVisible}/>
            </>
            :
            <>
            <h1 className='text-2xl' >Registration</h1>
            <form className=' text-white flex flex-col gap-[30px] mb-[20px]' action="">
              <input id='FirstName' className='rounded-lg w-[200px] bg-slate-700' placeholder=' First name' type='text' value={firstName} onChange={firstNameHandleChange}></input>
              <input id='LastName' className='rounded-lg w-[200px] bg-slate-700' placeholder=' Last name' type='text' value={lastName} onChange={lastNameHandleleChange}></input>
              <input id='Email' className='rounded-lg w-[200px] bg-slate-700' placeholder=' Email' type='text' value={email} onChange={emailHandleChange}></input>
              <input id='Phone' className='rounded-lg w-[200px] bg-slate-700' placeholder=' Phone' type='text' value={phone} onChange={phoneHandleChange}></input>
              <input id='WorkerId' className='rounded-lg w-[200px] bg-slate-700' placeholder=' Worker id' type='text' value={worker_Id} onChange={workerIdHandleChange}></input>
            </form>
            <button className= 'bg-gray-500 w-[60px] mb-[50px] h-[30px] rounded-md border-solid border-slate-500 p-0.5' onClick={()=>{togglePopUpSignUp(); saveUser()}}>button</button>

            </> }

            
    </div>
  )
}

export default SignUp