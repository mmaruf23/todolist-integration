import Navbar from '@/components/molecules/AdminNavbar';
import { getByUsername, updateUserProfile } from '@/services/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditUser() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (router.query.user) {
      setUser(router.query.user);
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

  const fetchData = async (username) => {
    const token = localStorage.getItem('token');
    try {
      const response = await getByUsername(token, username);
      if (response.data.status === 200) {
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleUpdate = async () => {
    if (username && email) {
      const payload = { username: username, email: email };
      const token = localStorage.getItem('token');
      console.log(payload);
      console.log(token);
      
      
      try {
        const res = await updateUserProfile(user,token, payload);
        console.log('Update Response:', res);
        alert('Profile updated successfully!');
        router.push('/todolist/dashboard/users'); 
      } catch (error) {
        console.error('Update failed:', error);
        alert('Failed to update profile');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update this profile
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email"
            />
          </div>

          <div className="pt-5">
            <button
              onClick={handleUpdate}
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </div>
          <div>
            <button
              onClick={() => router.back()}
              type="button"
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
