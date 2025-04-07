"use client";
import React, { useEffect, useState } from "react";
import nookies from 'nookies';

const HeaderHomePage = () => {
  const [usersName, setUsersName] = useState('');

  useEffect(() => {
    const cookies = nookies.get(null);
    const user = cookies.user ? JSON.parse(cookies.user) : null;
    if (user && user.user && user.user.first_name && user.user.last_name) {
      setUsersName(`${user.user.first_name} ${user.user.last_name}`);
    }
  }, []);

  return (
    <header className=' shadow-md shadow-black flex items-center fixed left-0 top-0 bg-black w-screen h-[40px]'>
      <div className='ml-4 text-white'>{usersName}</div>
      <h1 className='text-xl ml-auto mr-auto'>𝓦𝓸𝓻𝓴𝓮𝓻</h1>
    </header>
  );
};

export default HeaderHomePage;