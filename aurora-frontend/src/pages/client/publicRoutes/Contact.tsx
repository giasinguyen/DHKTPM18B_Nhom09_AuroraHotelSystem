import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ</h1>
          <p className="text-xl opacity-90">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Địa chỉ</h3>
                    <p className="text-gray-600">123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Điện thoại</h3>
                    <p className="text-gray-600">(+84) 28 3822 5678</p>
                    <p className="text-gray-600">(+84) 908 123 456 (Hotline)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@aurorahotel.vn</p>
                    <p className="text-gray-600">booking@aurorahotel.vn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Giờ hoạt động</h3>
                    <p className="text-gray-600">Lễ tân: 24/7</p>
                    <p className="text-gray-600">Tổng đài: 6:00 - 22:00</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Vị trí</h3>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-64 rounded-xl flex items-center justify-center">
                  <span className="text-6xl text-white">🗺️</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="0908 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="booking">Đặt phòng</option>
                    <option value="service">Dịch vụ</option>
                    <option value="complaint">Khiếu nại</option>
                    <option value="suggestion">Góp ý</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
