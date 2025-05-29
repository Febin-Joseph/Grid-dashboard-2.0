import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LogOut,
  ChevronDown,
} from "lucide-react";
import { menuItems } from "../../utils/menuData";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [e3AppsOpen, setE3AppsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col fixed top-0 left-0 h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Grid Manager 2.0</h1>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
          </div>
          <div>
            <p className="font-medium">Hey, {user?.name || "User"}</p>
            <p className="text-sm text-slate-400">User Id: {user?.userId || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Navigations */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href

          if (item.hasSubmenu) {
            return (
              <div key={item.title}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-2 text-left rounded-md transition-colors 
                    ${e3AppsOpen ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  onClick={() => setE3AppsOpen(!e3AppsOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${e3AppsOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            )
          }

          return (
            <Link
              key={item.title}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-colors 
                ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-8 pt-2 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-white
           hover:bg-slate-800 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar;