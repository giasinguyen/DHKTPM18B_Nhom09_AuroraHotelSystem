const MyBookingDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi tiết Booking</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Aurora Hotel - Deluxe Room</h2>
            <p className="text-gray-600">Mã đặt phòng: BK123456</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Đã xác nhận
          </span>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ngày nhận phòng</p>
              <p className="font-semibold">01/01/2024 - 14:00</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày trả phòng</p>
              <p className="font-semibold">03/01/2024 - 12:00</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Số đêm</p>
            <p className="font-semibold">2 đêm</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Số khách</p>
            <p className="font-semibold">2 người lớn</p>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Tổng cộng:</span>
              <span className="text-indigo-600">$300</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
            Hủy đặt phòng
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">
            In phiếu đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetailPage;
