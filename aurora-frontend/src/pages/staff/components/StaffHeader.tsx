const StaffHeader = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Aurora Hotel - Staff Portal</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="/staff" className="hover:text-blue-200">Dashboard</a>
          <a href="/staff/bookings" className="hover:text-blue-200">Bookings</a>
          <a href="/staff/rooms" className="hover:text-blue-200">Rooms</a>
          <a href="/staff/customers" className="hover:text-blue-200">Customers</a>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default StaffHeader;
