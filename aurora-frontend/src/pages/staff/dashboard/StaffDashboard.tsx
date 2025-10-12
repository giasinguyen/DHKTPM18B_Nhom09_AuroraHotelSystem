const StaffDashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Hôm nay Check-in</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Hôm nay Check-out</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Phòng trống</h3>
          <p className="text-3xl font-bold">15</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardPage;
