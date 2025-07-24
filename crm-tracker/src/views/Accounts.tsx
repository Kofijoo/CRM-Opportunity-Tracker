import { useRegion } from '../context/RegionContext';
import { Search, Filter, Plus, Building2, Users, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Account {
  id: string;
  company: string;
  industry: string;
  status: 'Active' | 'Inactive' | 'Prospect';
  value: number;
  employees: number;
  keyContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  lastActivity: string;
  nextMeeting?: string;
}

interface AccountsData {
  [key: string]: Account[];
}

const accountsData: AccountsData = {
  Oslo: [
    {
      id: 'A001',
      company: 'Telenor ASA',
      industry: 'Telecommunications',
      status: 'Active',
      value: 2500000,
      employees: 20000,
      keyContact: {
        name: 'Lars Hansen',
        title: 'IT Director',
        email: 'lars.hansen@telenor.com',
        phone: '+47 22 77 77 77'
      },
      lastActivity: '2024-01-15',
      nextMeeting: '2024-01-22'
    },
    {
      id: 'A002',
      company: 'DNB Bank',
      industry: 'Financial Services',
      status: 'Active',
      value: 1800000,
      employees: 12000,
      keyContact: {
        name: 'Maria Olsen',
        title: 'Head of Technology',
        email: 'maria.olsen@dnb.no',
        phone: '+47 03000'
      },
      lastActivity: '2024-01-12',
      nextMeeting: '2024-01-25'
    },
    {
      id: 'A003',
      company: 'Equinor',
      industry: 'Energy',
      status: 'Prospect',
      value: 3200000,
      employees: 21000,
      keyContact: {
        name: 'Erik Nordahl',
        title: 'Digital Transformation Lead',
        email: 'erik.nordahl@equinor.com',
        phone: '+47 51 99 00 00'
      },
      lastActivity: '2024-01-10'
    },
    {
      id: 'A004',
      company: 'Orkla Group',
      industry: 'Consumer Goods',
      status: 'Active',
      value: 950000,
      employees: 18000,
      keyContact: {
        name: 'Ingrid Berg',
        title: 'CIO',
        email: 'ingrid.berg@orkla.com',
        phone: '+47 22 54 40 00'
      },
      lastActivity: '2024-01-08',
      nextMeeting: '2024-01-20'
    }
  ],
  Bergen: [
    {
      id: 'A005',
      company: 'Grieg Group',
      industry: 'Shipping & Logistics',
      status: 'Active',
      value: 1200000,
      employees: 2500,
      keyContact: {
        name: 'Ola Grieg',
        title: 'Managing Director',
        email: 'ola.grieg@grieg.no',
        phone: '+47 55 30 80 00'
      },
      lastActivity: '2024-01-14',
      nextMeeting: '2024-01-21'
    },
    {
      id: 'A006',
      company: 'BKK',
      industry: 'Energy & Utilities',
      status: 'Active',
      value: 1600000,
      employees: 1200,
      keyContact: {
        name: 'Anne Knutsen',
        title: 'IT Manager',
        email: 'anne.knutsen@bkk.no',
        phone: '+47 55 17 90 00'
      },
      lastActivity: '2024-01-11'
    },
    {
      id: 'A007',
      company: 'Lerøy Seafood',
      industry: 'Food & Beverage',
      status: 'Prospect',
      value: 800000,
      employees: 5000,
      keyContact: {
        name: 'Bjørn Lerøy',
        title: 'Operations Director',
        email: 'bjorn.leroy@leroy.no',
        phone: '+47 55 21 30 00'
      },
      lastActivity: '2024-01-09'
    }
  ]
};

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-gray-100 text-gray-800',
  'Prospect': 'bg-blue-100 text-blue-800'
};

const getCompanyInitials = (company: string) => {
  return company.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

export default function Accounts() {
  const { region } = useRegion();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const accounts = accountsData[region] || [];
  
  // Filter accounts based on search and status
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.keyContact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Accounts – {region}</h1>
          <p className="text-gray-600 mt-1">{filteredAccounts.length} accounts found</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Account
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
              placeholder="Search accounts by company, industry, or contact..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Prospect">Prospect</option>
          </select>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {getCompanyInitials(account.company)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{account.company}</h3>
                  <p className="text-sm text-gray-500">{account.industry}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[account.status]}`}>
                {account.status}
              </span>
            </div>

            {/* Account Value & Employees */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Account Value</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.value)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Employees</p>
                <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                  <Users size={16} className="text-gray-400" />
                  {account.employees.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Key Contact */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Key Contact</p>
              <div>
                <p className="font-medium text-gray-900">{account.keyContact.name}</p>
                <p className="text-sm text-gray-500">{account.keyContact.title}</p>
                <div className="flex items-center gap-4 mt-2">
                  <a href={`mailto:${account.keyContact.email}`} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Mail size={12} />
                    Email
                  </a>
                  <a href={`tel:${account.keyContact.phone}`} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Phone size={12} />
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Activity & Meeting Info */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>Last Activity: {formatDate(account.lastActivity)}</span>
                {account.nextMeeting && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Calendar size={12} />
                    {formatDate(account.nextMeeting)}
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                  View Details
                </button>
                <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAccounts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
          <div className="text-gray-400 text-lg mb-2">No accounts found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
}
