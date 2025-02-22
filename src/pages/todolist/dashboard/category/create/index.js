import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/AdminNavbar';
import { addNewCategory, addTodolist } from '@/services/todolist';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AddCategory() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
      setMessage('Nama kategori tidak boleh kosong!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await addNewCategory(input, token);
      if (response.status == 201){

        setMessage('Kategori berhasil ditambahkan!');
        setTimeout(() => {
          router.push('/todolist/dashboard/category');
        }, 1500);
      }
    } catch (error) {
      console.error('Gagal menambahkan kategori:', error);
      setMessage('Terjadi kesalahan, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Tambah Kategori Baru
          </h1>

          {message && (
            <p className="text-center text-sm text-red-600 mb-4">{message}</p>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Nama Kategori
              </label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Masukkan nama kategori..."
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-2 rounded-xl text-white transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Menyimpan...' : 'Simpan Kategori'}
            </button>
            <button
              onClick={() => router.back()}
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
