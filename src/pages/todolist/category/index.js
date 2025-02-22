import TodolistCard from '@/components/molecules/Card/TodolistCard';
import Navbar from '@/components/molecules/Navbar';
import { useLogin } from '@/hooks/useLogin';
import {
  deleteTodolist,
  getAllTodos,
  getCategories,
  getTodosByCategory,
  getTodosByUser,
} from '@/services/todolist';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function CategoryPage() {
  const user = useLogin();
  const [categories, setCategories] = useState([]);
  const [todos, setTodos] = useState([]);
  const router = useRouter();
  const selectRef = useRef();

  useEffect(() => {
    if(user) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    const categoryData = await getCategories();
    // console.log(cate.data);
    setCategories(categoryData.data);
    const todoData = await getTodosByUser(user);
    console.log(todoData);
    setTodos(todoData.data);
  }

  const handleOnChange = async () => {
    const id = selectRef.current.value;
    if (id != 0) {
      const filterTodos = await getTodosByCategory(user,id);
      setTodos(filterTodos.data);
    } else {
      const filterTodos = await getTodosByUser(user);
      setTodos(filterTodos.data);
    }
  };

  const handleOnEdit = (id) => {
    console.log(id);
    router.push(`/todolist/edit/${id}`);
  };

  const handleOnDelete = (id) => {
    deleteTodolist(id).then((response) => {
      if (response) handleOnChange();
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        {/* <p className="text-center text-gray-600">User: {user}</p> */}
        <div className="text-center flex flex-col items-center my-10 gap-2">
          <select
            ref={selectRef}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 cursor-pointer transition duration-300 shadow-md"
          >
            <option value={0} className="text-gray-500">
              -- Semua Category --
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="text-gray-700"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 space-y-4">
          {todos.map((todo) => (
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
  );
}
