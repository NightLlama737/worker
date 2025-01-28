"use client"
import React from 'react'
const SignUp = ({setPopUpVisible} : { setPopUpVisible : React.Dispatch<React.SetStateAction<boolean>>}) => {
    
  return (
    <div  className=' f z-10 flex-col relative flex justify-between items-center    h-[400px] w-[500px] bg-slate-500 rounded-2xl'>
            <h1 className='text-2xl' >Log In</h1>
            <form className=' text-white flex flex-col gap-[30px] mb-[20px]' action="">
            <input className='rounded-lg w-[200px] bg-slate-700' placeholder=' Worker id'></input>
              <input className='rounded-lg w-[200px] bg-slate-700' placeholder=' Password'></input>
            </form>
            <button className= 'bg-gray-500 w-[60px] mb-[50px] h-[30px] rounded-md border-solid border-slate-500 p-0.5' onClick={()=>setPopUpVisible(false)}>button</button>
    </div>
  )
}

export default SignUp