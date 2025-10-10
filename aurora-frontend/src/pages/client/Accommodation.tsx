import { useState } from 'react';

export default function AccommodationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      category: 'standard',
      price: '800.000',
      image: '🛏️',
      area: '25m²',
      guests: 2,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'Điều hòa'],
      description: 'Phòng tiêu chuẩn thoải mái với đầy đủ tiện nghi cơ bản'
    },
    {
      id: 2,
      name: 'Deluxe Room',
      category: 'deluxe',
      price: '1.200.000',
      image: '🏨',
      area: '35m²',
      guests: 2,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'View thành phố', 'Ban công'],
      description: 'Phòng deluxe rộng rãi với view thành phố tuyệt đẹp'
    },
    {
      id: 3,
      name: 'Family Suite',
      category: 'suite',
      price: '1.800.000',
      image: '👨‍👩‍👧‍👦',
      area: '50m²',
      guests: 4,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'Phòng khách riêng', 'Bếp nhỏ'],
      description: 'Suite gia đình hoàn hảo cho các chuyến du lịch cùng người thân'
    },
    {
      id: 4,
      name: 'Executive Suite',
      category: 'suite',
      price: '2.500.000',
      image: '🏰',
      area: '65m²',
      guests: 2,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'Phòng làm việc', 'Jacuzzi'],
      description: 'Suite executive sang trọng dành cho khách VIP'
    },
    {
      id: 5,
      name: 'Presidential Suite',
      category: 'presidential',
      price: '5.000.000',
      image: '👑',
      area: '120m²',
      guests: 4,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'Butler service', 'Spa riêng', 'Sân thượng'],
      description: 'Phòng tổng thống xa hoa nhất với dịch vụ butler 24/7'
    },
    {
      id: 6,
      name: 'Ocean View Deluxe',
      category: 'deluxe',
      price: '1.500.000',
      image: '🌊',
      area: '40m²',
      guests: 2,
      amenities: ['Wi-Fi miễn phí', 'TV LCD', 'Minibar', 'View biển', 'Ban công lớn'],
      description: 'Phòng deluxe với view biển tuyệt đẹp và ban công rộng rãi'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả phòng' },
    { id: 'standard', name: 'Standard' },
    { id: 'deluxe', name: 'Deluxe' },
    { id: 'suite', name: 'Suite' },
    { id: 'presidential', name: 'Presidential' }
  ];

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Phòng nghỉ</h1>
          <p className="text-xl opacity-90">Khám phá các loại phòng sang trọng và hiện đại</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">{room.image}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <span className="text-2xl font-bold text-blue-600">{room.price}đ</span>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Diện tích:</span>
                      <span className="font-medium">{room.area}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Số khách:</span>
                      <span className="font-medium">{room.guests} người</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tiện nghi:</h4>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">
                          +{room.amenities.length - 3} khác
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Đặt phòng
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thông tin đặt phòng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-semibold mb-2">Đặt phòng qua điện thoại</h3>
              <p className="text-gray-600">(+84) 28 3822 5678</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💻</div>
              <h3 className="font-semibold mb-2">Đặt phòng online</h3>
              <p className="text-gray-600">Nhanh chóng và tiện lợi 24/7</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-semibold mb-2">Ưu đãi đặc biệt</h3>
              <p className="text-gray-600">Giảm 15% cho đặt phòng sớm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
