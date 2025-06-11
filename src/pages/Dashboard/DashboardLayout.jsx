import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-screen p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <nav className="flex flex-col gap-2">
          <Link to="clothes" className="hover:text-blue-600">Clothes</Link>
          <Link to="cosmetics" className="hover:text-blue-600">Cosmetics</Link>
          <Link to="electronics" className="hover:text-blue-600">Electronics</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
