import React, { useState, useContext, useEffect } from "react";
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
import logo from "/optiextract-logo.png";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect only after context finishes checking
  useEffect(() => {
    if (!loading && !user) navigate("/auth/login");
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const menu = [
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
    navigate("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-lexend">

      {/* Mobile navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between z-50">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
        <img src={logo} alt="logo" className="h-10" />
      </div>

      {/* Sidebar */}
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
          <img src={logo} alt="OptiExtract" className="h-12" />
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

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="hidden lg:flex h-16 bg-white shadow items-center justify-between px-6">
          <h2 className="text-xl font-semibold capitalize">
            {location.pathname.replace("/dashboard/", "") || "Dashboard"}
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">{user?.email}</span>
            <User size={26} />
          </div>
        </header>

        {/* Children */}
        <main className="p-6 mt-20 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
