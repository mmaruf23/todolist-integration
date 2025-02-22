import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllTodos } from '@/services/todolist';
import Navbar from '@/components/molecules/AdminNavbar';

export default function AdminDashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos().then((todos) => {
      setTodos(todos.data);
    });
  }, []);


  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard - Todo List
        </h1>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-center">Description</th>
                <th className="px-6 py-3 text-center">Category</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className={`border-b last:border-none ${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-3 text-gray-700">{todo.username}</td>
                  <td className="px-6 py-3 text-gray-700">{todo.title}</td>
                  <td className="px-6 py-3 text-gray-700 line-clamp-1">{todo.description}</td>
                  <td className="px-6 py-3 text-gray-700">{todo.category.name}</td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        todo.isCompleted
                          ? 'bg-green-200 text-green-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {todo.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
