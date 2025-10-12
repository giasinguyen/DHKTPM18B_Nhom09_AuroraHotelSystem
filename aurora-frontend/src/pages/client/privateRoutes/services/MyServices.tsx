const MyServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dịch vụ đã đặt</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Service Name</h3>
          <p className="text-gray-600 mb-4">Booking date: 01/01/2024</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-indigo-600">$50</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServicesPage;
