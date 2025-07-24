// src/components/Sidebar.tsx
import {
  Home,
  UserPlus,
  Briefcase,
  BarChart2,
  RefreshCw,
  LineChart,
  Settings,
  Menu,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: Home, to: '/dashboard' },
  { label: 'Leads', icon: UserPlus, to: '/leads' },
  { label: 'Accounts', icon: Briefcase, to: '/accounts' },
  { label: 'Opportunities', icon: BarChart2, to: '/opportunities' },
  { label: 'Renewals', icon: RefreshCw, to: '/renewals' },
  { label: 'Forecast', icon: LineChart, to: '/forecast' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar - hidden on mobile unless menu is open */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 bg-white shadow-lg h-full flex flex-col
      `}>
        {/* Logo/Brand */}
        <div className="px-6 py-8">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center">
            <span className="text-blue-600 mr-2">●</span>
            CRM Tracker
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pb-6 space-y-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              to={to}
              key={label}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-blue-600' : ''} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer section */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-medium">v1</span>
            </div>
            <span>CRM Tracker 1.0</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile - closes menu when clicking outside */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
