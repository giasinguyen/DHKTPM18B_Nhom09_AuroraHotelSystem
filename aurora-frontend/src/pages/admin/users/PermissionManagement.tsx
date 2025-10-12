const PermissionManagementPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý Permissions</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permission</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Manage Users</td>
              <td className="px-6 py-4"><input type="checkbox" defaultChecked /></td>
              <td className="px-6 py-4"><input type="checkbox" /></td>
              <td className="px-6 py-4"><input type="checkbox" /></td>
            </tr>
            <tr>
              <td className="px-6 py-4">Manage Bookings</td>
              <td className="px-6 py-4"><input type="checkbox" defaultChecked /></td>
              <td className="px-6 py-4"><input type="checkbox" defaultChecked /></td>
              <td className="px-6 py-4"><input type="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionManagementPage;
