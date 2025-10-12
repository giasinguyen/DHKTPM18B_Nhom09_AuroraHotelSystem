const RoleManagementPage = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Roles</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Tạo Role mới
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Admin</h3>
          <p className="text-gray-600 mb-4">Full system access</p>
          <button className="text-indigo-600 hover:text-indigo-900">Chỉnh sửa</button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Staff</h3>
          <p className="text-gray-600 mb-4">Hotel operations access</p>
          <button className="text-indigo-600 hover:text-indigo-900">Chỉnh sửa</button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Customer</h3>
          <p className="text-gray-600 mb-4">Basic booking access</p>
          <button className="text-indigo-600 hover:text-indigo-900">Chỉnh sửa</button>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;
