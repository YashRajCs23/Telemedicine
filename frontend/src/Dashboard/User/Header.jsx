import { Bell, Search } from "lucide-react";

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              size={16}
              className="absolute left-2.5 top-2.5 text-gray-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              YS
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-medium text-gray-800">Yash</p>
              <p className="text-xs text-gray-500">User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
