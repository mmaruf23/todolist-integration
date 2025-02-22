import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';
import { deleteTodolist, getTodosByTitle } from '@/services/todolist';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailTodo() {

  const router = useRouter();
  const [todo, setTodo] = useState();

  useEffect(() => {
    if (router.query.slug){
      console.log(router.query.slug);

      getTodosByTitle(router.query.slug).then((res) => {
        console.log(res);
        
          if (res.status == 200) {
            setTodo(res.data[0]);
          } 
        }
      )
    }


  },[router.query.slug])

  const handleOnEdit = (id) => {
      console.log(id);
      router.push(`/todolist/edit/${id}`);
    };
  
    const handleOnDelete = (id) => {
      const res = deleteTodolist(id).then(response => {
        if (response) router.back();
      });
      
    };


  return (
    <div className="flex flex-col min-h-[100svh]">
      <Navbar />

      <div className="flex-grow">
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Todo</h1>

          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Judul: </span>
              {todo?.title}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Deskripsi: </span>
              {todo?.description}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Status: </span>
              {todo &&
                (todo?.isCompleted ? (
                  <span className="ml-2 px-3 py-1 rounded-full text-white bg-green-500">
                    Selesai
                  </span>
                ) : (
                  <span className="ml-2 px-3 py-1 rounded-full text-white bg-blue-500">
                    Progress
                  </span>
                ))}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Kategori: </span>
              {todo?.category.name}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Dibuat oleh: </span>
              {todo?.username}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Dibuat pada: </span>
              {todo && String(new Date(todo?.createdAt))}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Terakhir diubah: </span>
              {todo && String(new Date(todo?.updatedAt))}
            </p>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => {
                handleOnEdit(todo.id);
              }}
              className="w-1/2 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleOnDelete(todo.id);
              }}
              className="w-1/2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
            Kembali ke Daftar Todo
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
