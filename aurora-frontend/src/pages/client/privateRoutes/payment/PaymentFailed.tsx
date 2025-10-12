const PaymentFailedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Thanh toán thất bại!</h1>
          <p className="text-gray-600 mb-6">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
              Thử lại
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

export default PaymentFailedPage;
