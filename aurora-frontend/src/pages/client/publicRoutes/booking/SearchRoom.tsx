const SearchRoomPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tìm kiếm phòng</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            placeholder="Ngày nhận phòng"
            className="border rounded-md px-4 py-2"
          />
          <input
            type="date"
            placeholder="Ngày trả phòng"
            className="border rounded-md px-4 py-2"
          />
          <input
            type="number"
            placeholder="Số khách"
            className="border rounded-md px-4 py-2"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Room Type</h3>
          <p className="text-gray-600 mb-4">Room description</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-indigo-600">$100/đêm</span>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
              Đặt phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRoomPage;
