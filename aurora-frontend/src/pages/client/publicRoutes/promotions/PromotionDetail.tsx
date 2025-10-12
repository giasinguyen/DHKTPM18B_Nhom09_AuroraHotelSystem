const PromotionDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi tiết khuyến mãi</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-4">SUMMER2024</h2>
          <p className="text-xl mb-2">Giảm 20%</p>
          <p>Cho booking từ 3 đêm trở lên</p>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Điều kiện áp dụng:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Đặt phòng tối thiểu 3 đêm</li>
              <li>Áp dụng cho tất cả loại phòng</li>
              <li>Không áp dụng cùng các khuyến mãi khác</li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-600">Có hiệu lực đến: 31/12/2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailPage;
