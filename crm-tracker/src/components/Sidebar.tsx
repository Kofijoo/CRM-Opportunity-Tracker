import {
  Home,
  UserPlus,
  Briefcase,
  BarChart2,
  RefreshCw,
  LineChart,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: <Home size={18} /> },
  { label: 'Leads', icon: <UserPlus size={18} /> },
  { label: 'Accounts', icon: <Briefcase size={18} /> },
  { label: 'Opportunities', icon: <BarChart2 size={18} /> },
  { label: 'Renewals', icon: <RefreshCw size={18} /> },
  { label: 'Forecast', icon: <LineChart size={18} /> },
  { label: 'Settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-full px-4 py-6">
      <h2 className="text-lg font-bold mb-8 text-gray-800">CRM Tracker 🇳🇴</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
