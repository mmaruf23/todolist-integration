import { allUsers } from "@/services/user";
import { useEffect, useState } from "react";

export default function AdminDashboardUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token){
      fetchData(token);
      
    }
  }, [])

  const fetchData = async (oke) => {
    const res = await allUsers(oke);
    setUsers(res.data)
  };
  
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard - Manage Users
      </h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b last:border-none ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-3 text-gray-700">{user.username}</td>
                <td className="px-6 py-3 text-gray-700">{user.email}</td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      user.role === 'Admin'
                        ? 'bg-red-200 text-red-700'
                        : 'bg-blue-200 text-blue-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3 flex justify-center gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                    onClick={() => editUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};
