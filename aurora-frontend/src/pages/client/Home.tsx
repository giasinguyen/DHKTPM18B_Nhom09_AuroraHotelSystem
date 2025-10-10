import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Chào mừng đến với Aurora Hotel
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Trải nghiệm tuyệt vời với dịch vụ 5 sao và không gian sang trọng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/accommodation"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Xem phòng nghỉ
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Aurora Hotel?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi mang đến trải nghiệm tuyệt vời với các tiện ích hiện đại và dịch vụ chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Phòng nghỉ cao cấp</h3>
              <p className="text-gray-600">Các phòng được thiết kế hiện đại với đầy đủ tiện nghi cao cấp</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ẩm thực tuyệt hảo</h3>
              <p className="text-gray-600">Nhà hàng 5 sao với các món ăn đặc sắc từ khắp nơi trên thế giới</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏊‍♂️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tiện ích đa dạng</h3>
              <p className="text-gray-600">Hồ bơi, spa, gym và nhiều dịch vụ giải trí hấp dẫn khác</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Phòng nghỉ phổ biến
            </h2>
            <p className="text-xl text-gray-600">Khám phá các loại phòng được yêu thích nhất</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Deluxe Room", price: "1.200.000", image: "🛏️", desc: "Phòng deluxe với view thành phố tuyệt đẹp" },
              { name: "Suite Room", price: "2.500.000", image: "🏰", desc: "Suite sang trọng với không gian rộng rãi" },
              { name: "Presidential", price: "5.000.000", image: "👑", desc: "Phòng tổng thống với dịch vụ butler riêng" }
            ].map((room, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">{room.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{room.price}đ<span className="text-sm text-gray-500">/đêm</span></span>
                    <Link 
                      to="/accommodation"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn sàng cho chuyến đi tuyệt vời?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Đặt phòng ngay hôm nay và nhận ưu đãi đặc biệt cho khách hàng mới
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Đặt phòng ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
