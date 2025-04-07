"use client";
import React, { useState } from "react";
import Home from "./layout/Home";
import HeaderHomePage from "./HeaderHomePage";
import SideBar from "./SideBar";
import Profile from "./layout/Profile";
import Messages from "./layout/Messages";
import Settings from "./layout/Settings";

export default function Layout() {
  const [selectedPage, setSelectedPage] = useState('Home');

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case 'Home':
        return <Home />;
      case 'Profile':
        return <Profile />;
      case 'Messages':
        return <Messages />;
      case 'Settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <HeaderHomePage />
      <div className="flex justify-between">
        <SideBar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        
        {renderSelectedPage()}
          
        
      </div>
    </>
  );
}