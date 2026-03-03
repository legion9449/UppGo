import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 pt-24">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6 space-y-6">

        <h2 className="text-2xl font-bold mb-6">
          Admin Panel
        </h2>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Manage Events
        </NavLink>

        <NavLink
          to="/admin/activity"
          className={({ isActive }) =>
            `p-3 rounded-lg ${
              isActive ? "bg-white text-black" : "hover:bg-gray-800"
            }`
          }
        >
          Activity Log
        </NavLink>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;