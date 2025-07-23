// src/components/Topbar.tsx
import { useRegion } from '../context/RegionContext';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Topbar() {
  const { region, setRegion } = useRegion();

  // Example deal amount (for demo)
  const demoAmount = 129000;

  // Format currency in Norwegian Krone
  const formattedAmount = new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  }).format(demoAmount);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      {/* Search with icon */}
      <div className="relative md:w-1/3 w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search leads, accounts..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Region Selector */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-gray-500 font-medium">Region:</span>
          <div className="relative">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as 'Oslo' | 'Bergen')}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Oslo">🇳🇴 Oslo</option>
              <option value="Bergen">🇳🇴 Bergen</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Currency Display */}
        <div className="hidden md:block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
          {formattedAmount}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full w-9 h-9 font-medium shadow-sm hover:shadow transition-shadow">
            J
          </button>
        </div>
      </div>
    </header>
  );
}
