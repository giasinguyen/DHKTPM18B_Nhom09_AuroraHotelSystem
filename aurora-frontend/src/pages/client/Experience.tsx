export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      title: 'City Tour Premium',
      image: '🏙️',
      duration: 'Cả ngày',
      price: '1.500.000đ',
      description: 'Khám phá những địa điểm nổi tiếng nhất thành phố với hướng dẫn viên chuyên nghiệp'
    },
    {
      id: 2,
      title: 'Sunset Cruise',
      image: '🛥️',
      duration: '3 giờ',
      price: '2.200.000đ',
      description: 'Ngắm hoàng hôn tuyệt đẹp trên du thuyền sang trọng với tiệc buffet'
    },
    {
      id: 3,
      title: 'Cooking Class',
      image: '👨‍🍳',
      duration: '2 giờ',
      price: '800.000đ',
      description: 'Học nấu các món ăn truyền thống với đầu bếp 5 sao'
    },
    {
      id: 4,
      title: 'Helicopter Tour',
      image: '🚁',
      duration: '1 giờ',
      price: '8.000.000đ',
      description: 'Ngắm toàn cảnh thành phố từ trên cao với trực thăng riêng'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trải nghiệm</h1>
          <p className="text-xl opacity-90">Khám phá những hoạt động thú vị và độc đáo</p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">{exp.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span>Thời gian: {exp.duration}</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{exp.price}</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Đặt ngay
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
