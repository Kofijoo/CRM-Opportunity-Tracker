import { useRegion } from '../context/RegionContext';
import { TrendingUp, Target, BarChart3, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastData {
  month: string;
  pipeline: number;
  weighted: number;
  closed: number;
  target: number;
}

interface RegionForecast {
  [key: string]: {
    monthlyData: ForecastData[];
    metrics: {
      totalPipeline: number;
      weightedForecast: number;
      winRate: number;
      avgDealSize: number;
      dealsWon: number;
      dealsLost: number;
    };
  };
}

const forecastData: RegionForecast = {
  Oslo: {
    monthlyData: [
      { month: 'Jan', pipeline: 8500000, weighted: 5100000, closed: 4200000, target: 5000000 },
      { month: 'Feb', pipeline: 9200000, weighted: 5520000, closed: 4800000, target: 5000000 },
      { month: 'Mar', pipeline: 8800000, weighted: 5280000, closed: 5200000, target: 5000000 },
      { month: 'Apr', pipeline: 9500000, weighted: 5700000, closed: 4600000, target: 5000000 },
      { month: 'May', pipeline: 10200000, weighted: 6120000, closed: 5400000, target: 5000000 },
      { month: 'Jun', pipeline: 9800000, weighted: 5880000, closed: 5800000, target: 5000000 }
    ],
    metrics: {
      totalPipeline: 56000000,
      weightedForecast: 33600000,
      winRate: 68,
      avgDealSize: 1250000,
      dealsWon: 24,
      dealsLost: 11
    }
  },
  Bergen: {
    monthlyData: [
      { month: 'Jan', pipeline: 4200000, weighted: 2520000, closed: 2100000, target: 2500000 },
      { month: 'Feb', pipeline: 4600000, weighted: 2760000, closed: 2400000, target: 2500000 },
      { month: 'Mar', pipeline: 4400000, weighted: 2640000, closed: 2600000, target: 2500000 },
      { month: 'Apr', pipeline: 4750000, weighted: 2850000, closed: 2300000, target: 2500000 },
      { month: 'May', pipeline: 5100000, weighted: 3060000, closed: 2700000, target: 2500000 },
      { month: 'Jun', pipeline: 4900000, weighted: 2940000, closed: 2900000, target: 2500000 }
    ],
    metrics: {
      totalPipeline: 27950000,
      weightedForecast: 16770000,
      winRate: 72,
      avgDealSize: 850000,
      dealsWon: 18,
      dealsLost: 7
    }
  }
};

const Forecast = () => {
  const { region } = useRegion();
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  
  const data = forecastData[region];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Chart configurations
  const lineChartData = {
    labels: data.monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Pipeline',
        data: data.monthlyData.map(d => d.pipeline / 1000000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Weighted Forecast',
        data: data.monthlyData.map(d => d.weighted / 1000000),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Closed',
        data: data.monthlyData.map(d => d.closed / 1000000),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Target',
        data: data.monthlyData.map(d => d.target / 1000000),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ],
  };
  
  const pieChartData = {
    labels: ['Won', 'Lost'],
    datasets: [
      {
        data: [data.metrics.dealsWon, data.metrics.dealsLost],
        backgroundColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
        borderWidth: 0,
      },
    ],
  };
  
  const barChartData = {
    labels: data.monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Closed vs Target',
        data: data.monthlyData.map(d => ((d.closed / d.target) * 100)),
        backgroundColor: data.monthlyData.map(d => 
          d.closed >= d.target ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
        ),
        borderRadius: 4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Forecast – {region}</h1>
          <p className="text-gray-600 mt-1">Sales performance and pipeline forecast</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="12M">Last 12 Months</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pipeline</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(data.metrics.totalPipeline)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Weighted Forecast</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(data.metrics.weightedForecast)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Target className="text-green-600" size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Win Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {data.metrics.winRate}%
              </h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600 font-medium">+5%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Deal Size</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(data.metrics.avgDealSize)}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <DollarSign className="text-amber-600" size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600 font-medium">+15%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Forecast Trend (Million NOK)</h3>
          <div className="h-80">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Win/Loss Ratio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Win/Loss Ratio</h3>
          <div className="h-80">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Performance vs Target */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance vs Target (%)</h3>
        <div className="h-80">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pipeline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weighted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.monthlyData.map((month, index) => {
                const achievement = (month.closed / month.target) * 100;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{month.month}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(month.pipeline)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(month.weighted)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(month.closed)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(month.target)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        achievement >= 100 ? 'bg-green-100 text-green-800' : 
                        achievement >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {achievement.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
