"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'wss://your-websocket-domain.com');
      wsRef.current = websocket;
      
      websocket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        setError(null);
      };

      websocket.onmessage = (event: MessageEvent) => {
        try {
          const newMessage = JSON.parse(event.data) as Message;
          setMessages((prevMessages) => {
            // Check if message already exists to prevent duplicates
            const messageExists = prevMessages.some(
              msg => msg.date === newMessage.date && msg.message === newMessage.message
            );
            if (messageExists) return prevMessages;
            return [...prevMessages, newMessage];
          });
        } catch (error) {
          console.error('Error parsing message:', error);
          setError('Failed to parse message');
        }
      };

      websocket.onerror = (event: Event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
        setIsConnected(false);
      };

      websocket.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        wsRef.current = null;

        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 3000);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setError('Failed to create WebSocket connection');
      setIsConnected(false);
      
      // Attempt to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/fetchMessages?recipientEmail=${user.email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    connectWebSocket();

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [user, connectWebSocket]);

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
        email: user.email,
        message: newMessage,
        user: senderEmail,
        date: new Date().toISOString(),
      };

      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        throw new Error("WebSocket connection is not open");
      }

      // Send message through WebSocket
      wsRef.current.send(JSON.stringify(messageData));
      
      // Clear input after sending
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-start h-[80vh] w-[40vw] bg-slate-500 rounded-2xl p-[20px]">
      <h1 className="text-white">
        Messages with {user.first_name} {user.last_name}
        {!isConnected && <span className="text-red-500 ml-2">(Disconnected)</span>}
      </h1>
      <div className=" overflow-y-auto h-[500px] flex flex-col w-full mt-4">
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