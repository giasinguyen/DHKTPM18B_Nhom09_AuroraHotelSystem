const CreateBookingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Đặt phòng mới</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày nhận phòng
              </label>
              <input type="date" className="w-full border rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày trả phòng
              </label>
              <input type="date" className="w-full border rounded-md px-4 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại phòng
            </label>
            <select className="w-full border rounded-md px-4 py-2">
              <option>Chọn loại phòng</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea className="w-full border rounded-md px-4 py-2" rows={4}></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingPage;
