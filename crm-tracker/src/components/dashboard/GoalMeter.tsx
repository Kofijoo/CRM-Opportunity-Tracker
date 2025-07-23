import { useRegion } from '../../context/RegionContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface GoalData {
  [key: string]: {
    current: number;
    target: number;
    label: string;
    currency: boolean;
  };
}

const goalData: GoalData = {
  Oslo: {
    current: 235000,
    target: 300000,
    label: 'Q2 Revenue Goal',
    currency: true,
  },
  Bergen: {
    current: 125000,
    target: 200000,
    label: 'Q2 Revenue Goal',
    currency: true,
  },
};

export default function GoalMeter() {
  const { region } = useRegion();
  const { current, target, label, currency } = goalData[region];
  
  // Calculate percentage
  const percentage = Math.round((current / target) * 100);
  const remaining = target - current;
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Chart data
  const data = {
    datasets: [
      {
        data: [current, remaining],
        backgroundColor: ['#4f46e5', '#e5e7eb'],
        borderWidth: 0,
        cutout: '80%',
        borderRadius: 5,
      },
    ],
  };
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{percentage}%</span>
            <span className="text-sm text-gray-500">of goal</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Current</p>
          <p className="text-lg font-semibold text-indigo-600">
            {currency ? formatCurrency(current) : current}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Target</p>
          <p className="text-lg font-semibold text-gray-700">
            {currency ? formatCurrency(target) : target}
          </p>
        </div>
      </div>
    </div>
  );
}