"use client";
import React, { useState } from "react";
import UsersWindow from "./messagesLayout/usersWindow";
import MessageWindow from "./messagesLayout/messageWindow";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='flex items-center justify-between h-[93vh] w-[70vw] mr-[8%] mt-[30px] p-[5%] rounded-[10px] bg-black'>
      <UsersWindow onSelectUser={handleSelectUser} />
      {selectedUser && <MessageWindow user={selectedUser} />}
    </div>
  );
}

