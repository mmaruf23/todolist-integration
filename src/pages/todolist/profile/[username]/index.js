import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';
import { useLogin } from '@/hooks/useLogin';
import { updateProfile } from '@/services/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProfile() {
  const router = useRouter();
  const user = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) setUsername(user);
  }, [user]);

  const handleClick = async () => {
    if (!username.trim()) {
      console.log('Username is required');
      return;
    }

    if (!password) {
      console.log('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    if (password && confirmPassword) {
      console.log('tryty');

      const token = localStorage.getItem('token');
      const payload = {
        username: username,
        password: password,
      };
      if (token && payload) {
        try {
          const res = await updateProfile(user,token, payload);
          if (res.data.status == 200) {
            alert('Profile updated successfully');
            console.log(res.data.data);
            
            localStorage.setItem('token', res.data.data);

            router.back();
          } else {
            console.log(res);
            setErrorMessage(res.response?.data?.message || 'Update failed');
          }
        } catch (error) {
          setErrorMessage(error?.response?.data?.message || 'Update failed');
        }
      }
    }
  };

  return (
    <div className="min-h-[100svh] flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Update profile
          </h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="confirm password"
              />
            </div>
            <div className="pt-5">
              <button
                onClick={handleClick}
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
