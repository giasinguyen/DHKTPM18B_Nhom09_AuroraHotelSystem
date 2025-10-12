const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Thanh toán thành công!</h1>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã thanh toán.</p>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
