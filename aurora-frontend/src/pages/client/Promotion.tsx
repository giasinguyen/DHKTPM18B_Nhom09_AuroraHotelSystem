export default function PromotionPage() {
  const promotions = [
    {
      id: 1,
      title: 'Ưu đãi Mùa lễ hội',
      discount: '30%',
      description: 'Giảm 30% cho tất cả các loại phòng trong tháng 12',
      validUntil: '31/12/2024',
      code: 'HOLIDAY30',
      terms: ['Áp dụng cho lưu trú từ 2 đêm trở lên', 'Không áp dụng cùng với ưu đãi khác']
    },
    {
      id: 2,
      title: 'Đặt sớm - Tiết kiệm nhiều',
      discount: '25%',
      description: 'Đặt phòng trước 30 ngày để nhận ưu đãi hấp dẫn',
      validUntil: '28/02/2025',
      code: 'EARLY25',
      terms: ['Đặt trước 30 ngày', 'Thanh toán 100% khi đặt phòng']
    },
    {
      id: 3,
      title: 'Gói Honeymoon',
      discount: '40%',
      description: 'Ưu đãi đặc biệt cho các cặp đôi tuần trăng mật',
      validUntil: '31/03/2025',
      code: 'HONEY40',
      terms: ['Dành cho cặp đôi mới cưới', 'Bao gồm bữa sáng và spa']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Khuyến mãi</h1>
          <p className="text-xl opacity-90">Những ưu đãi hấp dẫn đang chờ bạn</p>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-2">{promo.discount}</div>
                  <div className="text-lg">GIẢM GIÁ</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{promo.title}</h3>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <div className="text-sm text-gray-600 mb-1">Mã ưu đãi:</div>
                    <div className="font-mono text-lg font-bold text-blue-600">{promo.code}</div>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Có hiệu lực đến: {promo.validUntil}
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Điều kiện:</div>
                    <ul className="space-y-1">
                      {promo.terms.map((term, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Sử dụng ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
