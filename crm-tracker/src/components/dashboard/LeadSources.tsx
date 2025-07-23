import { useRegion } from '../../context/RegionContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LeadSourceData {
  [key: string]: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

const leadSourceData: LeadSourceData = {
  Oslo: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Website',
        data: [12, 15, 18, 14, 20, 17],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue
      },
      {
        label: 'Referral',
        data: [8, 10, 12, 15, 10, 14],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green
      },
      {
        label: 'Direct',
        data: [5, 7, 4, 6, 8, 11],
        backgroundColor: 'rgba(139, 92, 246, 0.7)', // purple
      },
    ],
  },
  Bergen: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Website',
        data: [8, 10, 7, 9, 11, 13],
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue
      },
      {
        label: 'Referral',
        data: [5, 7, 9, 6, 8, 10],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green
      },
      {
        label: 'Direct',
        data: [3, 4, 2, 5, 4, 6],
        backgroundColor: 'rgba(139, 92, 246, 0.7)', // purple
      },
    ],
  },
};

export default function LeadSources() {
  const { region } = useRegion();
  const data = leadSourceData[region];
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          labelPointStyle: function() {
            return {
              pointStyle: 'circle',
              rotation: 0,
            };
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [2, 4],
          color: '#e5e7eb',
        },
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Lead Sources</h3>
        <div className="text-sm text-gray-500">Last 6 months</div>
      </div>
      
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        {data.datasets.map((dataset, index) => {
          const total = dataset.data.reduce((sum, value) => sum + value, 0);
          return (
            <div key={index} className="text-center">
              <div 
                className="w-3 h-3 rounded-full inline-block mr-1"
                style={{ backgroundColor: dataset.backgroundColor }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{dataset.label}</span>
              <p className="text-lg font-semibold">{total}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}