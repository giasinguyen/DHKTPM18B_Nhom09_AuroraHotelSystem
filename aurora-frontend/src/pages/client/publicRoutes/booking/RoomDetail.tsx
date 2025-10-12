const RoomDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chi tiết phòng</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-96 bg-gray-200 rounded-md mb-6"></div>
        <h2 className="text-2xl font-semibold mb-4">Room Name</h2>
        <p className="text-gray-600 mb-6">
          Room description, facilities, and details will be displayed here.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Đặt phòng ngay
        </button>
      </div>
    </div>
  );
};

export default RoomDetailPage;
