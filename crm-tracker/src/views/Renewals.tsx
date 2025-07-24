import { useRegion } from '../context/RegionContext';
import { Search, Filter, Plus, Calendar, AlertTriangle, Clock, User, Phone, Mail, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface Renewal {
  id: string;
  company: string;
  contractType: string;
  currentValue: number;
  renewalValue: number;
  renewalDate: string;
  probability: number;
  accountManager: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  lastContact: string;
  status: 'At Risk' | 'On Track' | 'Confirmed' | 'Lost';
}

interface RenewalsData {
  [key: string]: Renewal[];
}

const renewalsData: RenewalsData = {
  Oslo: [
    {
      id: 'R001',
      company: 'Telenor ASA',
      contractType: 'Enterprise Software License',
      currentValue: 2500000,
      renewalValue: 2750000,
      renewalDate: '2024-01-25',
      probability: 85,
      accountManager: 'Kari Nordahl',
      contactPerson: {
        name: 'Lars Hansen',
        email: 'lars.hansen@telenor.com',
        phone: '+47 22 77 77 77'
      },
      lastContact: '2024-01-15',
      status: 'On Track'
    },
    {
      id: 'R002',
      company: 'DNB Bank',
      contractType: 'Cloud Services',
      currentValue: 1800000,
      renewalValue: 1980000,
      renewalDate: '2024-02-15',
      probability: 70,
      accountManager: 'Erik Olsen',
      contactPerson: {
        name: 'Maria Olsen',
        email: 'maria.olsen@dnb.no',
        phone: '+47 03000'
      },
      lastContact: '2024-01-12',
      status: 'On Track'
    },
    {
      id: 'R003',
      company: 'Equinor',
      contractType: 'Support & Maintenance',
      currentValue: 950000,
      renewalValue: 1045000,
      renewalDate: '2024-01-20',
      probability: 45,
      accountManager: 'Anne Berg',
      contactPerson: {
        name: 'Erik Nordahl',
        email: 'erik.nordahl@equinor.com',
        phone: '+47 51 99 00 00'
      },
      lastContact: '2024-01-08',
      status: 'At Risk'
    },
    {
      id: 'R004',
      company: 'Orkla Group',
      contractType: 'ERP System License',
      currentValue: 1200000,
      renewalValue: 1320000,
      renewalDate: '2024-03-10',
      probability: 90,
      accountManager: 'Per Hansen',
      contactPerson: {
        name: 'Ingrid Berg',
        email: 'ingrid.berg@orkla.com',
        phone: '+47 22 54 40 00'
      },
      lastContact: '2024-01-14',
      status: 'Confirmed'
    },
    {
      id: 'R005',
      company: 'Norsk Hydro',
      contractType: 'Security Services',
      currentValue: 650000,
      renewalValue: 0,
      renewalDate: '2024-01-10',
      probability: 0,
      accountManager: 'Lisa Andersen',
      contactPerson: {
        name: 'Per Andersen',
        email: 'per.andersen@hydro.com',
        phone: '+47 22 53 81 00'
      },
      lastContact: '2024-01-05',
      status: 'Lost'
    }
  ],
  Bergen: [
    {
      id: 'R006',
      company: 'Grieg Group',
      contractType: 'Logistics Software',
      currentValue: 1200000,
      renewalValue: 1320000,
      renewalDate: '2024-02-28',
      probability: 80,
      accountManager: 'Ola Knutsen',
      contactPerson: {
        name: 'Ola Grieg',
        email: 'ola.grieg@grieg.no',
        phone: '+47 55 30 80 00'
      },
      lastContact: '2024-01-14',
      status: 'On Track'
    },
    {
      id: 'R007',
      company: 'BKK',
      contractType: 'Smart Grid Platform',
      currentValue: 1600000,
      renewalValue: 1760000,
      renewalDate: '2024-04-15',
      probability: 75,
      accountManager: 'Bjørn Olsen',
      contactPerson: {
        name: 'Anne Knutsen',
        email: 'anne.knutsen@bkk.no',
        phone: '+47 55 17 90 00'
      },
      lastContact: '2024-01-11',
      status: 'On Track'
    },
    {
      id: 'R008',
      company: 'Lerøy Seafood',
      contractType: 'Supply Chain Management',
      currentValue: 800000,
      renewalValue: 880000,
      renewalDate: '2024-01-30',
      probability: 95,
      accountManager: 'Kari Berg',
      contactPerson: {
        name: 'Bjørn Lerøy',
        email: 'bjorn.leroy@leroy.no',
        phone: '+47 55 21 30 00'
      },
      lastContact: '2024-01-13',
      status: 'Confirmed'
    }
  ]
};

const getDaysUntilRenewal = (renewalDate: string) => {
  const today = new Date();
  const renewal = new Date(renewalDate);
  const diffTime = renewal.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getRenewalUrgency = (days: number) => {
  if (days < 0) return { category: 'Overdue', color: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-800' };
  if (days <= 30) return { category: 'Due This Month', color: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-800' };
  if (days <= 60) return { category: 'Due Next Month', color: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-800' };
  if (days <= 90) return { category: 'Due in 3 Months', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-800' };
  return { category: 'Future Renewals', color: 'bg-gray-50 border-gray-200', badge: 'bg-gray-100 text-gray-800' };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-green-100 text-green-800';
    case 'On Track': return 'bg-blue-100 text-blue-800';
    case 'At Risk': return 'bg-red-100 text-red-800';
    case 'Lost': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Renewals = () => {
  const { region } = useRegion();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const renewals = renewalsData[region] || [];
  
  // Filter renewals based on search and status
  const filteredRenewals = renewals.filter(renewal => {
    const matchesSearch = renewal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         renewal.contractType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         renewal.accountManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || renewal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Group renewals by urgency
  const renewalsByUrgency = filteredRenewals.reduce((acc, renewal) => {
    const days = getDaysUntilRenewal(renewal.renewalDate);
    const urgency = getRenewalUrgency(days);
    if (!acc[urgency.category]) acc[urgency.category] = [];
    acc[urgency.category].push({ ...renewal, daysUntilRenewal: days });
    return acc;
  }, {} as Record<string, (Renewal & { daysUntilRenewal: number })[]>);
  
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
  
  const getTotalRenewalValue = () => {
    return filteredRenewals.reduce((sum, renewal) => sum + renewal.renewalValue, 0);
  };
  
  const getAtRiskValue = () => {
    return filteredRenewals
      .filter(renewal => renewal.status === 'At Risk' || getDaysUntilRenewal(renewal.renewalDate) < 0)
      .reduce((sum, renewal) => sum + renewal.currentValue, 0);
  };

  const urgencyOrder = ['Overdue', 'Due This Month', 'Due Next Month', 'Due in 3 Months', 'Future Renewals'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Renewals – {region}</h1>
          <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
            <span>{filteredRenewals.length} renewals</span>
            <span>Total Value: <strong>{formatCurrency(getTotalRenewalValue())}</strong></span>
            <span className="text-red-600">At Risk: <strong>{formatCurrency(getAtRiskValue())}</strong></span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Renewal
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search renewals by company, contract type, or account manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Renewals Timeline */}
      <div className="space-y-6">
        {urgencyOrder.map(category => {
          const categoryRenewals = renewalsByUrgency[category] || [];
          if (categoryRenewals.length === 0) return null;
          
          const urgencyInfo = getRenewalUrgency(category === 'Overdue' ? -1 : 
                                               category === 'Due This Month' ? 15 :
                                               category === 'Due Next Month' ? 45 :
                                               category === 'Due in 3 Months' ? 75 : 120);
          
          return (
            <div key={category} className={`rounded-xl border-2 ${urgencyInfo.color} p-6`}>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {category === 'Overdue' && <AlertTriangle className="text-red-500" size={20} />}
                  {category !== 'Overdue' && <Clock className="text-gray-500" size={20} />}
                  <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${urgencyInfo.badge}`}>
                    {categoryRenewals.length} contracts
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Value: <strong>{formatCurrency(categoryRenewals.reduce((sum, r) => sum + r.renewalValue, 0))}</strong>
                </div>
              </div>
              
              {/* Renewal Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {categoryRenewals.map((renewal) => (
                  <div key={renewal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    {/* Company and Contract */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{renewal.company}</h3>
                        <p className="text-sm text-gray-600">{renewal.contractType}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(renewal.status)}`}>
                        {renewal.status}
                      </span>
                    </div>
                    
                    {/* Values and Date */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Current Value</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(renewal.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Renewal Value</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {renewal.renewalValue > 0 ? formatCurrency(renewal.renewalValue) : 'Lost'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Renewal Date and Days */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Renewal Date:</span>
                        <span className="font-medium">{formatDate(renewal.renewalDate)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">Days:</span>
                        <span className={`font-medium ${
                          renewal.daysUntilRenewal < 0 ? 'text-red-600' :
                          renewal.daysUntilRenewal <= 30 ? 'text-orange-600' : 'text-gray-900'
                        }`}>
                          {renewal.daysUntilRenewal < 0 ? `${Math.abs(renewal.daysUntilRenewal)} days overdue` : `${renewal.daysUntilRenewal} days left`}
                        </span>
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Account Manager</div>
                      <div className="text-sm font-medium text-gray-900 mb-2">{renewal.accountManager}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Contact Person</div>
                      <div className="text-sm text-gray-900">{renewal.contactPerson.name}</div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700 transition-colors flex items-center justify-center gap-1">
                        <Phone size={14} />
                        Contact
                      </button>
                      <button className="flex-1 py-2 px-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-700 transition-colors flex items-center justify-center gap-1">
                        <RefreshCw size={14} />
                        Renew
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredRenewals.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <RefreshCw size={48} className="text-gray-300 mx-auto mb-4" />
          <div className="text-gray-400 text-lg mb-2">No renewals found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
};

export default Renewals;
