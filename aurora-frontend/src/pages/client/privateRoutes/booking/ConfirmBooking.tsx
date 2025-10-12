const ConfirmBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Đặt phòng thành công!</h1>
          <p className="text-gray-600 mb-6">
            Chúng tôi đã gửi email xác nhận đến địa chỉ của bạn.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">Mã đặt phòng:</p>
            <p className="text-xl font-bold">BK123456</p>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
              Xem chi tiết đặt phòng
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300">
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
