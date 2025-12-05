import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Upload,
  FilePlus,
  FileText,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
} from "lucide-react";

import { AuthContext } from "@/context/AuthContext";

interface MenuItem {
  name: string;
  path: string;
  icon: React.FC<{ size?: number }>;
}

const DashboardLayout: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const menu: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Upload File", path: "/dashboard/upload", icon: Upload },
    { name: "Add Document Type", path: "/dashboard/add-type", icon: FilePlus },
    { name: "All Documents", path: "/dashboard/documents", icon: FileText },
    { name: "Insights", path: "/dashboard/insights", icon: BarChart3 },
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-lexend">
      {/* MOBILE NAVBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between z-50">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        <img src="/optiextract-logo.png" alt="OptiExtract Logo" className="h-10" />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-40
        transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-600"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>

        <div className="flex items-center px-4 py-6">
          <img src="/optiextract-logo.png" alt="OptiExtract" className="h-12" />
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menu.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition 
                ${active ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
              >
                <Icon size={20} />
                <span className="ml-3">{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* RIGHT CONTENT */}
      <div className="flex-1 lg:ml-64">
        <header className="hidden lg:flex h-16 bg-white shadow items-center justify-between px-6">
          <h2 className="text-xl font-semibold capitalize">
            {location.pathname.replace("/dashboard/", "") || "Dashboard"}
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">{user?.email}</span>
            <User size={26} />
          </div>
        </header>

        <main className="p-6 mt-20 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
