import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  fullName: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

export default function Accounts() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        const response = await axios.get(
          `https://localhost:7113/api/User/${email}`
        );

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <span className="gothic-regular text-4xl text-[#101aca]">
          Account Infomation
        </span>
        <span className="gothic-regular text-sm text-gray-400">
          Home /Account Infomation
        </span>
      </div>
      <div className="bg-amber-100 shadow-md rounded-xl p-6 max-w-3xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="text-lg font-medium">{user.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-lg font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="text-lg font-medium">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created At</p>
            <p className="text-lg font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`text-lg font-medium ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
