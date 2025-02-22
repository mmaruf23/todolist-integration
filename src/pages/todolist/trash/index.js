import Navbar from '@/components/molecules/Navbar';
import { getTrash, permanentDeleteTodolist, restoreDeleteTodolist } from '@/services/todolist';
import { useEffect, useState } from 'react';

export default function Trash() {
  const [deletedTodos, setDeleteTodos] = useState([]);

  useEffect(() => {
    getTrash().then((trash) => {
      if (trash.status == 200) {
        setDeleteTodos(trash.data);
      }
    });
  }, []);

  const fetchTrash = async () => {
    const trash = await getTrash();
    if (trash.status == 200){
      setDeleteTodos(trash.data)
    }
  }

  const handleRestore = async (id) => {
    const res = await restoreDeleteTodolist(id);
    if (res.status == 200) {
      fetchTrash()
    } else {  
      console.log(res.data);
    }
  };

  const handlePermanentDelete = async (id) => {
    const res = await permanentDeleteTodolist(id);
    if (res.status == 200) {
      fetchTrash()
    } else {
      console.log(res.data);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric", 
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Daftar To-Do List yang Dihapus
        </h1>

        {deletedTodos.length === 0 ? (
          <p className="text-gray-500">Tidak ada to-do yang dihapus.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Judul</th>
                  <th className="px-4 py-2 text-left">Deskripsi</th>
                  <th className="px-4 py-2 text-left">Kategori</th>
                  <th className="px-4 py-2 text-left">Dibuat</th>
                  <th className="px-4 py-2 text-left">Dihapus</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {deletedTodos.map((todo) => (
                  <tr key={todo.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{todo.title}</td>
                    <td className="px-4 py-2">{todo.description}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {todo.category.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {formatTime(todo.createdAt)}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {formatTime(todo.deletedAt)}
                    </td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => handleRestore(todo.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Hapus Permanen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
