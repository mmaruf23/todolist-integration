import { useAdmin } from '@/hooks/useLogin';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  useAdmin();
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/todolist/dashboard"}>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </Link>

        {/* Menu */}
        <div className="flex gap-6">
          <Link
            href="/todolist/dashboard/all-todolist"
            className="hover:text-gray-300"
          >
            Manage TodoList
          </Link>
          <Link
            href="/todolist/dashboard/users"
            className="hover:text-gray-300"
          >
            Manage Users
          </Link>
          <Link
            href="/todolist/dashboard/category"
            className="hover:text-gray-300"
          >
            Manage Category
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
