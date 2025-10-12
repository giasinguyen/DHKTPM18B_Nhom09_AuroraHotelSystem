const MyServiceDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi tiết dịch vụ đã đặt</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Service Name</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Ngày đặt</p>
            <p className="font-semibold">01/01/2024</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trạng thái</p>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Đã hoàn thành
            </span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Tổng cộng:</span>
              <span className="text-indigo-600">$50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyServiceDetailPage;
