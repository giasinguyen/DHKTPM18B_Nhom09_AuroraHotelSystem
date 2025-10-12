const CancelBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Hủy đặt phòng</h2>
          <p className="text-gray-600 text-center mb-6">
            Bạn có chắc chắn muốn hủy đặt phòng này không? Hành động này không thể hoàn tác.
          </p>
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Mã đặt phòng:</p>
            <p className="font-bold">BK123456</p>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700">
              Xác nhận hủy
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingPage;
