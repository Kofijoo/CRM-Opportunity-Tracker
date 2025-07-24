import { useRegion } from '../context/RegionContext';
import { Search, Filter, Plus, Eye, Edit, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface Lead {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Lost';
  source: 'Website' | 'Referral' | 'Cold Call' | 'Social Media';
  value: number;
  dateAdded: string;
}

interface LeadsData {
  [key: string]: Lead[];
}

const leadsData: LeadsData = {
  Oslo: [
    {
      id: 'L001',
      company: 'Telenor ASA',
      contact: 'Lars Hansen',
      email: 'lars.hansen@telenor.com',
      phone: '+47 22 77 77 77',
      status: 'Qualified',
      source: 'Website',
      value: 150000,
      dateAdded: '2024-01-15'
    },
    {
      id: 'L002',
      company: 'DNB Bank',
      contact: 'Maria Olsen',
      email: 'maria.olsen@dnb.no',
      phone: '+47 03000',
      status: 'Proposal',
      source: 'Referral',
      value: 250000,
      dateAdded: '2024-01-12'
    },
    {
      id: 'L003',
      company: 'Equinor',
      contact: 'Erik Nordahl',
      email: 'erik.nordahl@equinor.com',
      phone: '+47 51 99 00 00',
      status: 'Contacted',
      source: 'Cold Call',
      value: 500000,
      dateAdded: '2024-01-10'
    },
    {
      id: 'L004',
      company: 'Orkla Group',
      contact: 'Ingrid Berg',
      email: 'ingrid.berg@orkla.com',
      phone: '+47 22 54 40 00',
      status: 'New',
      source: 'Social Media',
      value: 75000,
      dateAdded: '2024-01-08'
    }
  ],
  Bergen: [
    {
      id: 'L005',
      company: 'Grieg Group',
      contact: 'Ola Grieg',
      email: 'ola.grieg@grieg.no',
      phone: '+47 55 30 80 00',
      status: 'Qualified',
      source: 'Website',
      value: 120000,
      dateAdded: '2024-01-14'
    },
    {
      id: 'L006',
      company: 'BKK',
      contact: 'Anne Knutsen',
      email: 'anne.knutsen@bkk.no',
      phone: '+47 55 17 90 00',
      status: 'Contacted',
      source: 'Referral',
      value: 200000,
      dateAdded: '2024-01-11'
    },
    {
      id: 'L007',
      company: 'Lerøy Seafood',
      contact: 'Bjørn Lerøy',
      email: 'bjorn.leroy@leroy.no',
      phone: '+47 55 21 30 00',
      status: 'New',
      source: 'Website',
      value: 180000,
      dateAdded: '2024-01-09'
    }
  ]
};

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-green-100 text-green-800',
  'Proposal': 'bg-purple-100 text-purple-800',
  'Lost': 'bg-red-100 text-red-800'
};

export default function Leads() {
  const { region } = useRegion();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const leads = leadsData[region] || [];
  
  // Filter leads based on search and status
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
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
          <h1 className="text-2xl font-bold text-gray-800">Leads – {region}</h1>
          <p className="text-gray-600 mt-1">{filteredLeads.length} leads found</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Lead
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
              placeholder="Search leads by company or contact..."
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
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{lead.company}</div>
                      <div className="text-sm text-gray-500">{lead.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{lead.contact}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={12} />
                        {lead.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={12} />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{lead.source}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(lead.value)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.dateAdded)}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No leads found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
