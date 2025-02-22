import { useLogin } from '@/hooks/useLogin';
import { Home, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const user = useLogin();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <nav className="bg-blue-500 text-white py-4 px-6 shadow-lg mb-14">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center space-x-1 hover:underline"
          >
            <Home size={20} />
            <span>Beranda</span>
          </Link>
        </div>

        <h1 className="text-xl font-bold">TodoList App</h1>
        <div
          className="relative w-20 p-2"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center space-x-1 cursor-pointer hover:underline">
            <User size={20} />
            <span>{user?.toUpperCase()}</span>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg overflow-hidden">
              <Link
                href={`/todolist/profile`}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Detail Profil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
