"use client";
import React from "react";

type Page = 'Home' | 'Profile' | 'Messages' | 'Settings';

interface SideBarProps {
    selectedPage: Page;
    setSelectedPage: (page: Page) => void;
}

export default function SideBar({ selectedPage, setSelectedPage }: SideBarProps) {
    const pages: Page[] = ['Home', 'Profile', 'Messages', 'Settings'];
    
    return (
        <div className='shadow-lg shadow-black flex rounded-[10px] items-center flex-col w-[200px] mt-[30px] h-[93vh] bg-black'>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setSelectedPage(page)}
                    className={`rounded-[12px] mt-[15%] w-[180px] h-[30px] border-solid border-transparent p-0.5 ${
                        selectedPage === page ? 'bg-slate-900 border-white' : 'bg-slate-500 border-transparent'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}