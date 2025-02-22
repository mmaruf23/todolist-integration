import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';
import { useLogin } from '@/hooks/useLogin';
import { editTodolist, getCategories, getTodoById } from '@/services/todolist';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UpdateTodo() {
  const router = useRouter();
  const [todoId, setTodoId] = useState();
  const [categories, setCategories] = useState([]);
  const user = useLogin();
  const [form, setForm] = useState({
    username: user,
    title: '',
    description: '',
    categoryId: '',
    isCompleted: false,
    imagePath: null,
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, username: user }));
    }
  }, [user]);

  useEffect(() => {
    const { id } = router.query;
    fetchCategory();
    if (id) {
      setTodoId(id);
      fetchDataTodo(id);
    }
  }, [router.query]);

  async function fetchCategory() {
    const res = await getCategories();
    if (res.data) {
      setCategories(res.data);
    }
  }

  async function fetchDataTodo(id) {
    const res = await getTodoById(id);
    if (res) {
      setForm((prev) => ({
        ...prev,
        title: res.title,
        description: res.description,
        categoryId: res.category.id,
        isCompleted: res.isCompleted || false,
      }));
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('categoryId', form.categoryId);
      formData.append('isCompleted', form.isCompleted);
      if (form.imagePath) {
        formData.append('imagePath', form.imagePath);
      }
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const res = await editTodolist(todoId, formData);
      if (res.status == 200) {
        const a = alert('Berhasil diupdate!');
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push('/todolist');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[100svh] flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Update todolist
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Judul
              </label>
              <input
                onChange={handleChange}
                value={form.title}
                name="title"
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Masukkan judul todo..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Deskripsi
              </label>
              <textarea
                onChange={handleChange}
                value={form.description}
                name="description"
                rows="3"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Tambahkan deskripsi todo..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Kategori
              </label>
              <select
                onChange={handleChange}
                value={form.categoryId}
                name="categoryId"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Pilih Kategori</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                onChange={handleChange}
                checked={form.isCompleted}
                name="isCompleted"
                type="checkbox"
                className="w-5 h-5 text-blue-500"
              />
              <label htmlFor="completed" className="text-gray-700">
                Selesai
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Update Todo
            </button>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
