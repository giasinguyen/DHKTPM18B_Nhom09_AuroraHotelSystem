const ServiceDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi tiết dịch vụ</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-64 bg-gray-200 rounded-md mb-6"></div>
        <h2 className="text-2xl font-semibold mb-4">Service Name</h2>
        <p className="text-gray-600 mb-6">Detailed service description.</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">$50</span>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
            Đặt dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
