export default function TodolistCard({todo, handleOnEdit, handleOnDelete}) {
  return (
    <div
      className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
    >
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
        <p className="text-gray-600 mb-2 text-wrap line-clamp-1">
          {todo.description}
        </p>
        {todo.isCompleted ? (
          <span className="text-sm px-3 py-1 bg-green-400 text-white rounded-full">
            Selesai
          </span>
        ) : (
          <span className="text-sm px-3 py-1 bg-blue-400 text-white rounded-full">
            Progress
          </span>
        )}
      </div>
      <div className="space-x-2 min-w-36">
        <button
          onClick={() => {
            handleOnEdit(todo.id);
          }}
          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleOnDelete(todo.id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};
