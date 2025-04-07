"use client";
import React, { useState } from "react";
import UsersWindow from "./messagesLayout/usersWindow";
import MessageWindow from "./messagesLayout/messageWindow";
import nookies from "nookies";

interface StoredUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface CookieUser {
  user: StoredUser;
}

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState<StoredUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectUser = (user: StoredUser) => {
    setSelectedUser(user);
  };
  
  let currentUser: CookieUser | null = null;
  
  try {
    const cookies = nookies.get(null);
    currentUser = cookies.user ? (JSON.parse(cookies.user) as CookieUser) : null;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    setError(errorMessage);
    return <div className="text-red-500">Error: {errorMessage}</div>;
  }

  return (
    <div className='shadow-lg shadow-black flex items-center justify-between h-[93vh] w-[70vw] mr-[8%] mt-[30px] p-[5%] rounded-[10px] bg-black'>
      <UsersWindow onSelectUser={handleSelectUser} />
      {selectedUser && <MessageWindow user={selectedUser} />}
    </div>
  );
}

