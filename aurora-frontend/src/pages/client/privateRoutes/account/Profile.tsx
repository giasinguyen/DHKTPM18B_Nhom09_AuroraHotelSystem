const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Thông tin cá nhân</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Họ và tên</label>
            <p className="font-semibold">John Doe</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-semibold">john.doe@example.com</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Số điện thoại</label>
            <p className="font-semibold">0123456789</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Địa chỉ</label>
            <p className="font-semibold">123 Street, City</p>
          </div>
        </div>
        <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
