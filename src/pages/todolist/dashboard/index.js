import { getRole } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');

  }, [router]);

  function showRole(token) {
    getRole(token)
  }
  return (
    <div className="bg-gray-900 min-h-[100svh] flex justify-center items-center p-4">
      <div className="text-white font-serif font-semibold h-72 max-w-3xl w-full flex flex-col gap-8 items-center bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl text-center">Welcome to Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Link
            href={"/todolist/dashboard/all-todolist"}
            className="py-3 px-6 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
          >
            MANAGE TODOLIST
          </Link>
          <Link
            href={"/todolist/dashboard/users"}
            className="py-3 px-6 bg-white text-gray-900 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
          >
            MANAGE USER
          </Link>
        </div>
      </div>
    </div>

  );
}
