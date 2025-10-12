const AdminHeader = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Aurora Hotel - Admin Portal</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="/admin" className="hover:text-red-200">Dashboard</a>
          <a href="/admin/users" className="hover:text-red-200">Users</a>
          <a href="/admin/hotels" className="hover:text-red-200">Hotels</a>
          <a href="/admin/bookings" className="hover:text-red-200">Bookings</a>
          <a href="/admin/reports/revenue" className="hover:text-red-200">Reports</a>
          <button className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-red-50">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
