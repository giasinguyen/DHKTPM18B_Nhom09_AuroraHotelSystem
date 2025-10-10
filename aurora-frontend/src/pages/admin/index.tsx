import { Outlet } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Aurora Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Xin chào, Admin</span>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
        
        {/* Default Admin Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Quản Trị</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-4">🏨</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Tổng phòng</h3>
                  <p className="text-2xl font-bold text-blue-600">250</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-4">✅</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phòng có khách</h3>
                  <p className="text-2xl font-bold text-green-600">180</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-4">🔄</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Đang dọn</h3>
                  <p className="text-2xl font-bold text-yellow-600">25</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-4">💰</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Doanh thu hôm nay</h3>
                  <p className="text-2xl font-bold text-purple-600">450M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Quản lý đặt phòng</h3>
              <p className="text-gray-600 mb-4">Xem và quản lý các đặt phòng mới</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Xem đặt phòng
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Quản lý phòng</h3>
              <p className="text-gray-600 mb-4">Cập nhật trạng thái và thông tin phòng</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Quản lý phòng
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Báo cáo doanh thu</h3>
              <p className="text-gray-600 mb-4">Xem báo cáo chi tiết về doanh thu</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Xem báo cáo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
