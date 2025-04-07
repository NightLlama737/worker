"use client";
import React, { useEffect, useState } from "react";
import nookies from 'nookies';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Message {
  email: string;
  user: string;
  message: string;
  date: string;
}

interface MessageWindowProps {
  user: User;
}

export default function MessageWindow({ user }: MessageWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const cookies = nookies.get(null);
        const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

        if (currentUser) {
          const response = await fetch(`/api/fetchMessages?recipientEmail=${user.email}`);
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          const data: Message[] = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:3000/api/socket');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const addMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    const cookies = nookies.get(null);
    const currentUser = cookies.user ? JSON.parse(cookies.user) : null;
    const senderEmail = currentUser ? currentUser.user.email : null;

    if (!senderEmail) {
      alert("User not found!");
      return;
    }

    try {
      const messageData: Message = {
        email: user.email, // Recipient
        message: newMessage,
        user: senderEmail, // Sender (ensure this matches the `user` property in `Message` type)
        date: new Date().toISOString(),
      };

      // Send the message via WebSocket
      const ws = new WebSocket('ws://localhost:3000/api/socket');
      ws.onopen = () => {
        ws.send(JSON.stringify(messageData));
      };

      setMessages((prevMessages) => [...prevMessages, messageData]); // Ensure `messageData` matches `Message` type
      setNewMessage(""); // Clear input after sending
    } catch (error) {
      console.log('Error adding message:', error);
      alert((error as Error).message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-start h-[80vh] w-[40vw] bg-slate-500 rounded-2xl p-[20px]">
      <h1 className="text-white">Messages with {user.first_name} {user.last_name}</h1>
      <div className="flex flex-col w-full mt-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-slate-700 rounded p-2 mb-2 text-white">
            <p>{message.message}</p>
            <small>{new Date(message.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={newMessage} 
        onChange={handleInputChange} 
        className="w-full mt-4 p-2 rounded bg-gray-800 text-white"
        placeholder="Type a message..." 
      />
      <button 
        onClick={addMessage} 
        className="bg-gray-500 ml-auto mr-auto w-[100px] h-[40px] rounded-md border-solid border-slate-500 mt-2"
      >
        Send
      </button>
    </div>
  );
}