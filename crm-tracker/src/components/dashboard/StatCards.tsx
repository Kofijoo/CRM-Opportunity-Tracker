import { useRegion } from '../../context/RegionContext';
import { 
  UserPlus, 
  BarChart2, 
  Users, 
  CreditCard,
  TrendingUp,
  Clock
} from 'lucide-react';

// Define the stats data structure
interface RegionStats {
  leads: number;
  opportunities: number;
  revenue: number;
  newCustomers: number;
  conversionRate: number;
  avgDealCycle: number;
}

interface StatsData {
  [key: string]: RegionStats;
}

// Enhanced mock data with more metrics
const statsData: StatsData = {
  Oslo: {
    leads: 42,
    opportunities: 18,
    revenue: 235000,
    newCustomers: 12,
    conversionRate: 28.6, // percentage
    avgDealCycle: 14, // days
  },
  Bergen: {
    leads: 21,
    opportunities: 9,
    revenue: 125000,
    newCustomers: 5,
    conversionRate: 23.8, // percentage
    avgDealCycle: 18, // days
  },
};

// Card configuration for consistent styling and icons
const statCards = [
  {
    id: 'leads',
    title: 'New Leads',
    icon: UserPlus,
    color: 'blue',
    getValue: (stats: RegionStats) => stats.leads,
    format: (value: number) => value.toString(),
    trend: 12, // percentage increase
  },
  {
    id: 'opportunities',
    title: 'Opportunities',
    icon: BarChart2,
    color: 'indigo',
    getValue: (stats: RegionStats) => stats.opportunities,
    format: (value: number) => value.toString(),
    trend: 5, // percentage increase
  },
  {
    id: 'customers',
    title: 'New Customers',
    icon: Users,
    color: 'green',
    getValue: (stats: RegionStats) => stats.newCustomers,
    format: (value: number) => value.toString(),
    trend: 8, // percentage increase
  },
  {
    id: 'revenue',
    title: 'Estimated Revenue',
    icon: CreditCard,
    color: 'purple',
    getValue: (stats: RegionStats) => stats.revenue,
    format: (value: number) => new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0,
    }).format(value),
    trend: 15, // percentage increase
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    icon: TrendingUp,
    color: 'amber',
    getValue: (stats: RegionStats) => stats.conversionRate,
    format: (value: number) => `${value}%`,
    trend: -2, // percentage decrease
  },
  {
    id: 'dealCycle',
    title: 'Avg. Deal Cycle',
    icon: Clock,
    color: 'rose',
    getValue: (stats: RegionStats) => stats.avgDealCycle,
    format: (value: number) => `${value} days`,
    trend: -5, // percentage decrease (improvement)
  },
];

// Color mapping for different card styles
const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'text-blue-500',
    trend: {
      positive: 'text-blue-700 bg-blue-100',
      negative: 'text-red-700 bg-red-100',
    },
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    icon: 'text-indigo-500',
    trend: {
      positive: 'text-indigo-700 bg-indigo-100',
      negative: 'text-red-700 bg-red-100',
    },
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: 'text-green-500',
    trend: {
      positive: 'text-green-700 bg-green-100',
      negative: 'text-red-700 bg-red-100',
    },
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: 'text-purple-500',
    trend: {
      positive: 'text-purple-700 bg-purple-100',
      negative: 'text-red-700 bg-red-100',
    },
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: 'text-amber-500',
    trend: {
      positive: 'text-amber-700 bg-amber-100',
      negative: 'text-red-700 bg-red-100',
    },
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    icon: 'text-rose-500',
    trend: {
      positive: 'text-rose-700 bg-rose-100',
      negative: 'text-green-700 bg-green-100', // For deal cycle, negative is good
    },
  },
};

export default function StatCards() {
  const { region } = useRegion();
  const stats = statsData[region];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card) => {
        const value = card.getValue(stats);
        const formattedValue = card.format(value);
        const colors = colorClasses[card.color as keyof typeof colorClasses];
        const Icon = card.icon;
        
        // Determine if trend is positive or negative
        const isTrendPositive = card.id === 'dealCycle' ? card.trend < 0 : card.trend > 0;
        const trendClass = isTrendPositive ? colors.trend.positive : colors.trend.negative;
        const trendPrefix = card.trend > 0 ? '+' : '';
        
        return (
          <div 
            key={card.id}
            className={`${colors.bg} rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <h3 className={`mt-2 text-2xl font-bold ${colors.text}`}>
                  {formattedValue}
                </h3>
              </div>
              <div className={`p-3 rounded-full ${colors.bg} border border-gray-100`}>
                <Icon className={colors.icon} size={20} />
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${trendClass}`}>
                {trendPrefix}{card.trend}%
              </span>
              <span className="ml-2 text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}