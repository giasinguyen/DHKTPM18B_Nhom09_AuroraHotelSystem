const UserEditPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Chỉnh sửa User</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên đầy đủ</label>
            <input type="text" defaultValue="John Doe" className="w-full border rounded-md px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" defaultValue="john@example.com" className="w-full border rounded-md px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Admin</option>
              <option>Staff</option>
              <option>Customer</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
              Hủy
            </button>
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
