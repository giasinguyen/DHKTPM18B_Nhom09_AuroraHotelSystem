const PaymentHistoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lịch sử thanh toán</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã giao dịch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">TXN123456</td>
              <td className="px-6 py-4">01/01/2024</td>
              <td className="px-6 py-4 font-semibold">$350</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Thành công
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
