import Navbar from '@/components/molecules/AdminNavbar';
import { useToken } from '@/hooks/useLogin';
import {
  allUsers,
  deleteUserByUsername,
  findByUsername,
  setAdmin,
} from '@/services/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function AdminDashboardUsers() {
  const [users, setUsers] = useState([]);
  const [stat, setStat] = useState(false);

  const [pick, setPick] = useState();
  const inputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData(token);
    }
  }, [router.query]);

  const fetchData = async (oke) => {
    if (!router.query.search) {
      const res = await allUsers(oke);
      setUsers(res.data);
    } else {
      const res = await findByUsername(oke, router.query.search);
      console.log(res);
      setUsers(res.data);
    }
  };

  const handleOnClick = (e) => {
    setStat(true);
    setPick(e);
    console.log(e);
  };

  const handleOnSet = async (prompt) => {
    setStat(false);

    if (prompt) {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await setAdmin(token, pick);

        if (res?.status == 200) {
          alert(`${pick} berhasil dijadikan admin`);
          if (inputRef.current.value) {
            router.push(
              `/todolist/dashboard/users?search=${inputRef.current.value}`
            );
          }
          router.push(router.pathname);
        }
      }
    }
  };

  const deleteUser = async (username) => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await deleteUserByUsername(token, username);
      console.log(res);

      if (res.status == 200) {
        if (inputRef.current.value) {
          router.push(
            `/todolist/dashboard/users?search=${inputRef.current.value}`
          );
        }
        router.push(router.pathname);
      }
    }
  };

  const handleSearch = () => {
    if (inputRef.current.value) {
      if (inputRef.current.value != router.query.search) {
        router.push(
          `/todolist/dashboard/users?search=${inputRef.current.value}`
        );
      }
    }
    if (!inputRef.current.value && router.query.search) {
      router.push(router.pathname);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center relative">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard - Manage Users
        </h1>

        <div className="mb-4 w-full gap-5 flex max-w-4xl px-5">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by username..."
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onClick={handleSearch}
            className="w-20 bg-red-500 hover:bg-red-600 text-white px-3 text-sm rounded-lg shadow-md"
            type="button"
            value={'SEARCH'}
          />
        </div>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-scroll">
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
              {users?.map((user, index) => (
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
                      onClick={() => handleOnClick(user.username)}
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
                    <Link href={`users/edit/${user.username}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                      onClick={() => deleteUser(user.username)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {stat && (
          <div className="absolute top-60 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-56 bg-white border border-gray-600 shadow-lg rounded-xl p-4 flex flex-col items-center text-center">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Jadikan user ini sebagai admin?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleOnSet(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  YES
                </button>
                <button
                  onClick={() => handleOnSet(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
