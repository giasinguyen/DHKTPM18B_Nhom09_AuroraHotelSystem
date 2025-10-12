const AdminDashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Tổng Booking</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Doanh thu</h3>
          <p className="text-3xl font-bold">$123,456</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Khách hàng</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Tỷ lệ lấp đầy</h3>
          <p className="text-3xl font-bold">85%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
