const ServiceListPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dịch vụ khách sạn</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Service Name</h3>
          <p className="text-gray-600 mb-4">Service description</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceListPage;
