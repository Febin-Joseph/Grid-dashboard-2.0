import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Peak Shaving & Alert</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">Carlsberg Group</span>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;