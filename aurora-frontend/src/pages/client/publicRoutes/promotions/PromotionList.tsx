const PromotionListPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mã khuyến mãi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-2">SUMMER2024</h3>
          <p className="mb-4">Giảm 20% cho booking từ 3 đêm trở lên</p>
          <p className="text-sm">Có hiệu lực đến: 31/12/2024</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionListPage;
