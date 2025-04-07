"use client";
import { useState } from 'react';
import HeaderHomePage from './HeaderHomePage';
import SideBar from './SideBar';
import Home from './layout/Home';
import Profile from './layout/Profile';
import Messages from './layout/Messages';
import Settings from './layout/Settings';

// Import the Page type or define it here
type Page = 'Home' | 'Profile' | 'Messages' | 'Settings';

export default function Layout() {
  // Specify the state type as Page
  const [selectedPage, setSelectedPage] = useState<Page>('Home');

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