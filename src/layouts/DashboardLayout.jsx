import React, { useState } from "react";
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
  Bell,
} from "lucide-react";
import logo from "/optiextract-logo.png";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <div className="flex min-h-screen bg-gray-50 font-lexend">

      {/* ===== MOBILE TOP NAV (SMALL SCREENS) ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex items-center justify-between z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
        <img src={logo} alt="OptiExtract" className="h-9 object-contain" />
      </div>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-[#050716] text-gray-100 
          shadow-2xl border-r border-white/10
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 z-50
        `}
      >
        {/* Close button (mobile) */}
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-300"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center px-5 py-6 border-b border-white/10">
          <img src={logo} alt="OptiExtract" className="h-10 object-contain" />
        </div>

        {/* Menu items */}
        <nav className="mt-4 px-3 space-y-1">
          {menu.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`
                  relative flex items-center px-4 py-3 rounded-xl text-sm
                  transition-all duration-150
                  ${active
                    ? "bg-white/10 text-white shadow-md"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"}
                `}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full bg-[#A855F7]" />
                )}

                <Icon
                  size={18}
                  className={`mr-3 ${
                    active ? "text-[#A855F7]" : "text-gray-400"
                  }`}
                />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm text-red-300 hover:bg-red-900/30 rounded-xl transition"
          >
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 min-h-screen lg:ml-64 flex flex-col">
        {/* TOP BAR (DESKTOP) */}
        <header className="hidden lg:flex h-16 bg-white shadow-sm items-center justify-between px-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {getPageTitle(location.pathname)}
            </h2>
            <p className="text-xs text-gray-500">
              Manage and review your documents with AI-powered extraction.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <Link
              to="/dashboard/profile"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#A855F7] to-indigo-500 text-white text-sm font-semibold">
                U
              </div>
              <span className="text-sm text-gray-700">Profile</span>
            </Link>
          </div>
        </header>

        {/* MAIN CONTENT (with padding & top spacing on mobile) */}
        <main className="flex-1 p-4 md:p-6 mt-16 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function getPageTitle(pathname) {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Dashboard";
  if (pathname.includes("/dashboard/upload")) return "Upload File";
  if (pathname.includes("/dashboard/add-type")) return "Add Document Type";
  if (pathname.includes("/dashboard/documents")) return "All Documents";
  if (pathname.includes("/dashboard/insights")) return "Insights";
  if (pathname.includes("/dashboard/profile")) return "Profile";
  if (pathname.includes("/dashboard/settings")) return "Settings";
  return "Dashboard";
}
