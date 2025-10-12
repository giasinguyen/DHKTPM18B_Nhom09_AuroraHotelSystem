const PromotionCreatePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Tạo Promotion</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mã khuyến mãi</label>
            <input type="text" className="w-full border rounded-md px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giảm giá (%)</label>
            <input type="number" className="w-full border rounded-md px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Tạo Promotion
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromotionCreatePage;
