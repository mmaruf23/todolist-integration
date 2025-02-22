import Navbar from '@/components/molecules/AdminNavbar';
import Footer from '@/components/molecules/Footer';
import { deleteCategoryById, getCategories } from '@/services/todolist';
import { SquarePlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminDashboardCategory() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  const deleteCategory = async (id) => {
    console.log(id);

    const res = await deleteCategoryById(id);
    console.log(res);

    if (res.status == 200) {
      fetchData();
    }
  };

  return (
    <div className="min-h-[100svh] flex flex-col">
      <Navbar />
      <div className="p-6 bg-white flex-1 flex flex-col items-center relative">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard - Manage Categories
        </h1>

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id} className={`border-b last:border-none`}>
                  <td className="px-6 py-3 text-gray-700">{category.id}</td>
                  <td className="px-6 py-3 text-gray-700">{category.name}</td>

                  <td className="px-6 py-3 flex justify-center gap-2">
                    <Link
                      href={`category/edit/${category.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-lg shadow-md"
                      onClick={() => deleteCategory(category.id)}
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
      <div className="flex justify-center h-40">
        <div className="max-w-4xl w-full relative">
          <div className="absolute bottom-16 right-10">
            <button
              onClick={() => {
                router.push('/todolist/dashboard/category/create');
              }}
            >
              <SquarePlus
                size={50}
                color="white"
                className="bg-green-400 rounded-lg"
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
