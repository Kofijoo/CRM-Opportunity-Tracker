import { useRegion } from '../context/RegionContext';

export default function Topbar() {
  const { region, setRegion } = useRegion();

  // Example deal amount (for demo)
  const demoAmount = 129000;

  // Format currency in Norwegian Krone
  const formattedAmount = new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 2,
  }).format(demoAmount);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Search */}
      <input
        type="text"
        placeholder="Søk leads, kontoer..."
        className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 w-1/3 text-sm"
      />

      {/* Region and Currency */}
      <div className="flex items-center gap-6">
        {/* Region Switcher */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium">Region:</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as 'Oslo' | 'Bergen')}
            className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="Oslo">🇳🇴 Oslo</option>
            <option value="Bergen">🇳🇴 Bergen</option>
          </select>
        </div>

        {/* Currency Display */}
        <span className="text-sm font-medium text-gray-600">{formattedAmount}</span>

        {/* User Initials */}
        <div className="bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold text-sm">
          J
        </div>
      </div>
    </header>
  );
}
