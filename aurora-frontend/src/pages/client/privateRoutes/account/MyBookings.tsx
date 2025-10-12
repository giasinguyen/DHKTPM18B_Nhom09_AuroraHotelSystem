const MyBookingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking của tôi</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">Aurora Hotel - Deluxe Room</h3>
              <p className="text-gray-600">Mã đặt phòng: BK123456</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Đã xác nhận
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Ngày nhận phòng</p>
              <p className="font-semibold">01/01/2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày trả phòng</p>
              <p className="font-semibold">03/01/2024</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-indigo-600">$300</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
