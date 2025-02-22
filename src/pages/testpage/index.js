export default function Testpage(params) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Todo List</h1>

          <div className="flex items-center space-x-4">
            <span className="font-medium">John Doe</span>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <div className="flex justify-center">
        <div className="flex-grow max-w-4xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Daftar Todo
          </h2>

          {/* List Todo */}
          <div className="space-y-4">
            {/* Sample Todo */}
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Todo {id}
                  </h3>
                  <p className="text-gray-600">Deskripsi singkat todo {id}</p>
                  <span className="text-sm px-3 py-1 bg-green-500 text-white rounded-full">
                    Selesai
                  </span>
                </div>
                <div className="space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        <p>&copy; 2025 My Todo List. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
