import TodolistCard from '@/components/molecules/Card/TodolistCard';
import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';
import { useLogin } from '@/hooks/useLogin';
import {
  deleteTodolist,
  getTodosByTitle,
  getTodosByUser,
} from '@/services/todolist';
import { SquarePlus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Todolist() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();
  const inputRef = useRef();
  const user = useLogin();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search, user]);

  async function getData() {
    if (!router.query.search) {
      if (user) {
        const res = await getTodosByUser(user);
        if ((res.status = 200 && res.data)) {
          setTodos(res.data);
        }
      }
    } else {
      const res = await getTodosByTitle(router.query.search);
      if ((res.status = 200 && res.data)) {
        setTodos(res.data);
      }
    }
  }

  const handleOnclick = () => {

    if (inputRef.current.value) {
      if (inputRef.current.value != router.query.search) {
        router.push(`${router.pathname}?search=${inputRef.current.value}`);
      }
    }
    if (!inputRef.current.value && router.query.search) {

      router.push(router.pathname);
    }
  };

  const handleOnEdit = (id) => {
    console.log(id);
    router.push(`/todolist/edit/${id}`);
  };

  const handleOnDelete = (id) => {
    const res = deleteTodolist(id).then((response) => {
      if (response) getData();
    });
  };


  return (
    <div className="min-h-[100svh] flex flex-col">
      <Navbar />
      <div className="flex-grow relative">
        <div className="max-w-4xl w-auto mx-auto p-4">
          <div className="text-center flex items-center my-10 gap-2">
            <input
              ref={inputRef}
              className="border flex-grow border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Masukkan judul..."
            />
            <button
              onClick={handleOnclick}
              className="min-w-20 max-w-xs border py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer shadow-md"
              type="button"
            >
              Seach
            </button>
            <button
              onClick={() => {
                router.push('/todolist/category');
              }}
              className="min-w-28 max-w-xs border py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer shadow-md"
              type="button"
            >
              Category
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-4">
              {todos?.map((todo) => (
                <TodolistCard
                  key={todo.id}
                  todo={todo}
                  handleOnEdit={handleOnEdit}
                  handleOnDelete={handleOnDelete}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className='flex justify-center h-36'>
        <div className='max-w-4xl w-full relative'>
          <div className='absolute bottom-16 right-10'>
            <button onClick={() => {router.push("/todolist/create")}}>
              <SquarePlus size={50} color='white' className='bg-green-400 rounded-lg' />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
