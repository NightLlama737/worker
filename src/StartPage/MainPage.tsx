"use client";
import React, { useEffect } from 'react';
import Header from './Header';
import nookies from 'nookies';
import { redirect, useRouter } from 'next/navigation';


const MainPage = () => {
    const router = useRouter();
  
  useEffect(() => {
    const cookies = nookies.get(null);
    const user = cookies.user;
    console.log("Cookies:", cookies); // Debugging line
    console.log("User:", user); // Debugging line
    if (user != null) {
      redirect('/HomePage/');
    }
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default MainPage;