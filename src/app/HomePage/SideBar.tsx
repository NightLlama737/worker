"use client";
import React from "react";

export default function SideBar({ selectedPage, setSelectedPage }) {
    return (
        <div className='shadow-lg shadow-black flex rounded-[10px] items-center flex-col w-[200px] mt-[30px] h-[93vh] bg-black'>
            <button
                onClick={() => setSelectedPage('Home')}
                className={`rounded-[12px] mt-[15%] w-[180px] h-[30px] border-solid border-transparent p-0.5 ${selectedPage === 'Home' ? 'bg-slate-900 border-white': 'bg-slate-500 border-transparent'}`}
            >
                Home
            </button>
            <button
                onClick={() => setSelectedPage('Profile')}
                className={`rounded-[12px] mt-[15%] w-[180px] h-[30px] border-solid border-transparent p-0.5 ${selectedPage === 'Profile' ? 'bg-slate-900 border-white' : 'bg-slate-500 border-transparent'}`}
            >
                Profile
            </button>
            <button
                onClick={() => setSelectedPage('Messages')}
                className={`rounded-[12px] mt-[15%] w-[180px] h-[30px] border-solid border-transparent p-0.5 ${selectedPage === 'Messages' ? 'bg-slate-900 border-white' : 'bg-slate-500 border-transparent'}`}
            >
                Messages
            </button>
            <button
                onClick={() => setSelectedPage('Settings')}
                className={`rounded-[12px] mt-[15%] w-[180px] h-[30px] border-solid border-transparent p-0.5 ${selectedPage === 'Settings' ? 'bg-slate-900 border-white' : 'bg-slate-500 border-transparent'}`}
            >
                Settings
            </button>
        </div>
    );
}