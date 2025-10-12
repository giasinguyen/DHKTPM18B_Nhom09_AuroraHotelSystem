const ReviewBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Xem lại đặt phòng</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin đặt phòng</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Khách sạn:</span>
            <span className="font-semibold">Aurora Hotel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Loại phòng:</span>
            <span className="font-semibold">Deluxe Room</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày nhận phòng:</span>
            <span className="font-semibold">01/01/2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày trả phòng:</span>
            <span className="font-semibold">03/01/2024</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Tổng cộng:</span>
            <span className="text-indigo-600">$300</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300">
            Quay lại
          </button>
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
            Xác nhận đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingPage;
