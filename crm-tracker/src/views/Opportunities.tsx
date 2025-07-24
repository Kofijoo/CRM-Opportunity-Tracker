import { useRegion } from '../context/RegionContext';
import { Search, Filter, Plus, Calendar, User, TrendingUp, Building2 } from 'lucide-react';
import { useState } from 'react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  probability: number;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  expectedCloseDate: string;
  lastActivity: string;
}

interface OpportunitiesData {
  [key: string]: Opportunity[];
}

const opportunitiesData: OpportunitiesData = {
  Oslo: [
    {
      id: 'O001',
      title: 'Enterprise Software License',
      company: 'Telenor ASA',
      contact: 'Lars Hansen',
      value: 2500000,
      probability: 75,
      stage: 'Negotiation',
      expectedCloseDate: '2024-02-15',
      lastActivity: '2024-01-15'
    },
    {
      id: 'O002',
      title: 'Digital Transformation Project',
      company: 'DNB Bank',
      contact: 'Maria Olsen',
      value: 1800000,
      probability: 60,
      stage: 'Proposal',
      expectedCloseDate: '2024-02-28',
      lastActivity: '2024-01-12'
    },
    {
      id: 'O003',
      title: 'Cloud Migration Services',
      company: 'Equinor',
      contact: 'Erik Nordahl',
      value: 3200000,
      probability: 40,
      stage: 'Qualification',
      expectedCloseDate: '2024-03-15',
      lastActivity: '2024-01-10'
    },
    {
      id: 'O004',
      title: 'ERP System Implementation',
      company: 'Orkla Group',
      contact: 'Ingrid Berg',
      value: 950000,
      probability: 85,
      stage: 'Negotiation',
      expectedCloseDate: '2024-01-30',
      lastActivity: '2024-01-08'
    },
    {
      id: 'O005',
      title: 'Security Audit Services',
      company: 'Norsk Hydro',
      contact: 'Per Andersen',
      value: 450000,
      probability: 25,
      stage: 'Prospecting',
      expectedCloseDate: '2024-04-01',
      lastActivity: '2024-01-05'
    }
  ],
  Bergen: [
    {
      id: 'O006',
      title: 'Logistics Management System',
      company: 'Grieg Group',
      contact: 'Ola Grieg',
      value: 1200000,
      probability: 70,
      stage: 'Proposal',
      expectedCloseDate: '2024-02-20',
      lastActivity: '2024-01-14'
    },
    {
      id: 'O007',
      title: 'Smart Grid Technology',
      company: 'BKK',
      contact: 'Anne Knutsen',
      value: 1600000,
      probability: 55,
      stage: 'Qualification',
      expectedCloseDate: '2024-03-10',
      lastActivity: '2024-01-11'
    },
    {
      id: 'O008',
      title: 'Supply Chain Optimization',
      company: 'Lerøy Seafood',
      contact: 'Bjørn Lerøy',
      value: 800000,
      probability: 90,
      stage: 'Closed Won',
      expectedCloseDate: '2024-01-20',
      lastActivity: '2024-01-09'
    },
    {
      id: 'O009',
      title: 'Data Analytics Platform',
      company: 'Statoil Fuel',
      contact: 'Kari Olsen',
      value: 650000,
      probability: 0,
      stage: 'Closed Lost',
      expectedCloseDate: '2024-01-15',
      lastActivity: '2024-01-07'
    }
  ]
};

const stages = [
  { name: 'Prospecting', color: 'bg-gray-100 border-gray-200' },
  { name: 'Qualification', color: 'bg-blue-100 border-blue-200' },
  { name: 'Proposal', color: 'bg-yellow-100 border-yellow-200' },
  { name: 'Negotiation', color: 'bg-orange-100 border-orange-200' },
  { name: 'Closed Won', color: 'bg-green-100 border-green-200' },
  { name: 'Closed Lost', color: 'bg-red-100 border-red-200' }
];

const getProbabilityColor = (probability: number) => {
  if (probability >= 75) return 'text-green-600 bg-green-100';
  if (probability >= 50) return 'text-yellow-600 bg-yellow-100';
  if (probability >= 25) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
};

export default function Opportunities() {
  const { region } = useRegion();
  const [searchTerm, setSearchTerm] = useState('');
  
  const opportunities = opportunitiesData[region] || [];
  
  // Filter opportunities based on search
  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group opportunities by stage
  const opportunitiesByStage = stages.reduce((acc, stage) => {
    acc[stage.name] = filteredOpportunities.filter(opp => opp.stage === stage.name);
    return acc;
  }, {} as Record<string, Opportunity[]>);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('no-NO');
  };
  
  const getTotalValue = () => {
    return filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  };
  
  const getWeightedValue = () => {
    return filteredOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Opportunities – {region}</h1>
          <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
            <span>{filteredOpportunities.length} opportunities</span>
            <span>Total Value: <strong>{formatCurrency(getTotalValue())}</strong></span>
            <span>Weighted Value: <strong>{formatCurrency(getWeightedValue())}</strong></span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Opportunity
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search opportunities by title, company, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-6 overflow-x-auto">
        {stages.map((stage) => {
          const stageOpportunities = opportunitiesByStage[stage.name] || [];
          const stageValue = stageOpportunities.reduce((sum, opp) => sum + opp.value, 0);
          
          return (
            <div key={stage.name} className={`rounded-xl border-2 ${stage.color} p-4 min-h-96`}>
              {/* Stage Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-1">{stage.name}</h3>
                <div className="text-xs text-gray-600">
                  <div>{stageOpportunities.length} deals</div>
                  <div className="font-medium">{formatCurrency(stageValue)}</div>
                </div>
              </div>
              
              {/* Opportunity Cards */}
              <div className="space-y-3">
                {stageOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                    {/* Opportunity Header */}
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{opportunity.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Building2 size={12} />
                        {opportunity.company}
                      </div>
                    </div>
                    
                    {/* Value and Probability */}
                    <div className="mb-3">
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {formatCurrency(opportunity.value)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getProbabilityColor(opportunity.probability)}`}>
                          {opportunity.probability}%
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <TrendingUp size={12} />
                          {formatCurrency(opportunity.value * opportunity.probability / 100)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact and Date */}
                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <User size={12} />
                        {opportunity.contact}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar size={12} />
                        Close: {formatDate(opportunity.expectedCloseDate)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {stageOpportunities.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No opportunities
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
