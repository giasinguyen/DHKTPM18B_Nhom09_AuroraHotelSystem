const PaymentPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tổng tiền phòng:</span>
              <span className="font-semibold">$300</span>
            </div>
            <div className="flex justify-between">
              <span>Dịch vụ:</span>
              <span className="font-semibold">$50</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Tổng cộng:</span>
              <span className="text-indigo-600">$350</span>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phương thức thanh toán
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Thẻ tín dụng/ghi nợ</option>
              <option>Chuyển khoản ngân hàng</option>
              <option>Ví điện tử</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
          >
            Thanh toán
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
