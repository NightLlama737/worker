"use client"
import React, { useState } from 'react'

const SettingPasswordPopUp = ({setSettingPasswordPopUpVisible, setSignUpVisible} : { setSettingPasswordPopUpVisible : React.Dispatch<React.SetStateAction<boolean>>, setSignUpVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {

  return (
    <div  className=' f z-10 flex-col relative flex justify-between items-center    h-[400px] w-[500px] bg-slate-500 rounded-2xl'>
            <h1 className='text-2xl' >Seting password</h1>
            <form className=' text-white flex flex-col gap-[30px] mb-[20px]' action="">
              <input className='rounded-lg w-[200px] bg-slate-700' placeholder=' New password'></input>
              
            </form>
            <button className= 'bg-gray-500 w-[60px] mb-[50px] h-[30px] rounded-md border-solid border-slate-500 p-0.5' onClick={()=>{setSettingPasswordPopUpVisible(false); setSignUpVisible(false)}}>button</button>
    </div>
  )
}

export default SettingPasswordPopUp