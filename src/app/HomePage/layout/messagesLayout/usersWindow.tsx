"use client";
import React, { useEffect, useState } from "react";
import nookies from 'nookies';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface UsersWindowProps {
  onSelectUser: (user: User) => void;
}

export default function UsersWindow({ onSelectUser }: UsersWindowProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/fetchData');
        const data: User[] = await response.json();
        const cookies = nookies.get(null);
        const currentUser = cookies.user ? JSON.parse(cookies.user) : null;

        if (currentUser) {
          const filteredUsers = data.filter(user => user.email !== currentUser.user.email);
          setUsers(filteredUsers);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className=" justify-center items-start w-auto h-[80vh] bg-slate-500 rounded-2xl p-[20px]">
      {users.map(user => (
        <div key={user.id} className="user-div w-auto">
          <button
            className="bg-slate-700 rounded-[15px] mt-[0.5%] p-[10px] text-white"
            onClick={() => onSelectUser(user)}
          >
            {user.first_name} {user.last_name}
          </button>
        </div>
      ))}
    </div>
  );
}