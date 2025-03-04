import Navbar from '@/components/molecules/Navbar';
import { getProfile } from '@/services/auth';
import { Activity, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserDetail(token);
    }
  }, []);

  const getUserDetail = async (token) => {
    const res = await getProfile(token);
    if (res.data?.status == 200) {
      setProfile(res.data.data);
      console.log(res.data.data);
    } else {
      console.log(res);

      console.log('Gagal ambil data profile');
    }
  };

  const handleEdit = (profile) => {
    router.push(`/todolist/profile/${profile}`);
  };

  return (
    <>
      <Navbar />
      <div className=" mt-20 max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-xl border border-blue-300">
        <h1 className="text-2xl font-extrabold text-blue-700 text-center">
          Profile Detail
        </h1>
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700">
            <strong>Username:</strong> {profile.username}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {profile.role}
          </p>
          <p className="text-gray-700">
            <strong>Tanggal Dibuat:</strong>{' '}
            {new Date(profile.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Terakhir Update:</strong>{' '}
            {new Date(profile.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="flex items-center justify-around gap-3 px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all"
            onClick={() => {
              handleEdit(profile.username);
            }}
          >
            <Pencil />
            <span>Edit</span>
          </button>
          {(profile.role == "ADMIN") && (
            <Link
              href={'/todolist/dashboard'}
              className="flex items-center justify-around gap-3 px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all"
            >
              <Activity />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
