import React, { useState, useEffect } from 'react';
import { Lead, MeetingBooking } from '../types';
import { X, Database, RefreshCw, Trash2, Calendar, Mail, DollarSign, Download, Search, Tag, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, LogOut } from 'lucide-react';

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  onUpdateCount: (count: number) => void;
}

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({
  isOpen,
  onClose,
  showToast,
  onUpdateCount,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<MeetingBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDatabaseData = async () => {
    setLoading(true);
    try {
      const [leadsRes, bookingsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/bookings'),
      ]);

      const leadsJson = await leadsRes.json();
      const bookingsJson = await bookingsRes.json();

      if (leadsJson.success) {
        setLeads(leadsJson.data || []);
        onUpdateCount(leadsJson.data?.length || 0);
      }
      if (bookingsJson.success) {
        setBookings(bookingsJson.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Error loading database records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (isAuthenticated) {
        fetchDatabaseData();
      }
    } else {
      setIsAuthenticated(false);
      setPasswordInput('');
      setPasswordError('');
      setShowPassword(false);
    }
  }, [isOpen, isAuthenticated]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'chalnikal2026') {
      setIsAuthenticated(true);
      setPasswordError('');
      showToast('Admin authorization granted.', 'success');
    } else {
      setPasswordError('Access Denied');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        showToast(`Lead status updated to ${newStatus}`, 'success');
      } else {
        showToast('Failed to update status.', 'error');
      }
    } catch (err) {
      showToast('Error communicating with server.', 'error');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        onUpdateCount(leads.length - 1);
        showToast('Lead deleted from database.', 'success');
      }
    } catch (err) {
      showToast('Failed to delete lead.', 'error');
    }
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      showToast('No leads available to export.', 'error');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Company', 'Phone', 'Service Interest', 'Budget', 'Status', 'Submitted At', 'Details'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${l.budget.replace(/"/g, '""')}"`,
      l.status,
      l.createdAt,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dynoflix_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV exported successfully!', 'success');
  };

  if (!isOpen) return null;

  // Render Password Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        id="leads-admin-modal-overlay"
        className="fixed inset-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          id="leads-admin-login-card"
          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl max-w-md w-full p-8 relative shadow-2xl my-6 text-left flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] hover:text-[#FFFFFF] border border-[#222222] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Minimalist Lock Icon & Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0B0B0B] border border-[#C9A96A]/40 flex items-center justify-center text-[#C9A96A] shadow-[0_0_20px_rgba(201,169,106,0.15)]">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FFFFFF]">Admin Portal</h3>
              <p className="text-xs text-[#8A8A8A] mt-1 leading-relaxed">
                Protected area. Enter admin password to view lead submissions and calendar bookings.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Enter password..."
                  autoFocus
                  className={`w-full bg-[#0B0B0B] border ${
                    passwordError ? 'border-[#FF5F56]' : 'border-[#2A2A2A]'
                  } rounded-xl px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A] font-mono tracking-wider transition-colors pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="mt-2.5 px-3 py-2 rounded-lg bg-[#FF5F56]/10 border border-[#FF5F56]/30 flex items-center gap-2 text-xs text-[#FF5F56] font-mono">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#C9A96A] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:bg-[#D4B87C] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(201,169,106,0.25)]"
            >
              <span>Authenticate & Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="leads-admin-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0B0B0B]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="leads-admin-modal-card"
        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl max-w-5xl w-full p-6 sm:p-8 relative shadow-2xl my-6 text-left flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0B0B] border border-[#C9A96A]/40 flex items-center justify-center text-[#C9A96A]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FFFFFF] flex items-center gap-2">
                Dynoflix Admin Lead Portal
                <span className="text-xs font-mono text-[#27C93F] bg-[#27C93F]/10 px-2 py-0.5 rounded border border-[#27C93F]/20">
                  Authenticated
                </span>
              </h3>
              <p className="text-xs text-[#8A8A8A]">
                View and manage direct email lead submissions and booked discovery sessions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDatabaseData}
              className="p-2 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] hover:text-[#FFFFFF] border border-[#222222] transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C9A96A]' : ''}`} />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] hover:text-[#FF5F56] border border-[#222222] transition-colors cursor-pointer"
              title="Lock Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] hover:text-[#FFFFFF] border border-[#222222] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="pt-4 pb-3 flex flex-wrap items-center justify-between gap-4 shrink-0 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#C9A96A] text-[#0B0B0B]'
                  : 'bg-[#0B0B0B] text-[#8A8A8A] border border-[#222222]'
              }`}
            >
              Leads Database ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#C9A96A] text-[#0B0B0B]'
                  : 'bg-[#0B0B0B] text-[#8A8A8A] border border-[#222222]'
              }`}
            >
              Booked Sessions ({bookings.length})
            </button>
          </div>

          {activeTab === 'leads' && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8A8A8A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C9A96A] w-48"
                />
              </div>
              <button
                onClick={exportLeadsCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] text-xs font-mono text-[#C9A96A] hover:bg-[#222222] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {activeTab === 'leads' ? (
            filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-[#8A8A8A] text-xs font-mono">
                No lead submissions match your search query or database is empty.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1A1A1A]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FFFFFF]">{lead.name}</span>
                      <span className="text-xs font-mono text-[#8A8A8A]">({lead.email})</span>
                      {lead.company && (
                        <span className="text-[10px] font-mono text-[#C9A96A] bg-[#C9A96A]/10 px-2 py-0.5 rounded border border-[#C9A96A]/20">
                          {lead.company}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8A8A8A]">
                        {new Date(lead.createdAt).toLocaleString()}
                      </span>
                      {/* Status Selector */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead['status'])}
                        className={`text-[10px] font-mono font-bold uppercase rounded px-2 py-1 border focus:outline-none cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-[#FFBD2E]/10 text-[#FFBD2E] border-[#FFBD2E]/30'
                            : lead.status === 'contacted'
                            ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'
                            : lead.status === 'scheduled'
                            ? 'bg-[#C9A96A]/20 text-[#C9A96A] border-[#C9A96A]/40'
                            : 'bg-[#27C93F]/10 text-[#27C93F] border-[#27C93F]/30'
                        }`}
                      >
                        <option value="new" className="bg-[#0B0B0B] text-[#FFFFFF]">New</option>
                        <option value="contacted" className="bg-[#0B0B0B] text-[#FFFFFF]">Contacted</option>
                        <option value="scheduled" className="bg-[#0B0B0B] text-[#FFFFFF]">Scheduled</option>
                        <option value="closed" className="bg-[#0B0B0B] text-[#FFFFFF]">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 text-[#8A8A8A] hover:text-[#FF5F56] transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-[#8A8A8A]">
                    <div>
                      <span className="text-[#555555]">Interest:</span>{' '}
                      <span className="text-[#FFFFFF]">{lead.serviceInterest || 'General'}</span>
                    </div>
                    <div>
                      <span className="text-[#555555]">Budget:</span>{' '}
                      <span className="text-[#C9A96A]">{lead.budget}</span>
                    </div>
                    <div>
                      <span className="text-[#555555]">Phone:</span>{' '}
                      <span className="text-[#FFFFFF]">{lead.phone || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141414] border border-[#222222] text-xs text-[#8A8A8A] leading-relaxed">
                    <span className="text-[10px] font-mono text-[#555555] uppercase block mb-1">Project Details:</span>
                    {lead.details}
                  </div>
                </div>
              ))
            )
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-[#8A8A8A] text-xs font-mono">
              No calendar discovery calls scheduled yet.
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] space-y-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A96A]" />
                    <span className="font-bold text-sm text-[#FFFFFF]">{b.name}</span>
                    <span className="text-xs text-[#8A8A8A]">({b.email})</span>
                  </div>
                  <span className="text-xs font-mono text-[#C9A96A] font-bold bg-[#C9A96A]/10 px-2.5 py-0.5 rounded border border-[#C9A96A]/20">
                    {b.meetingType}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[#555555]">Date:</span>{' '}
                    <span className="text-[#FFFFFF]">{b.date}</span>
                  </div>
                  <div>
                    <span className="text-[#555555]">Time Slot:</span>{' '}
                    <span className="text-[#C9A96A]">{b.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[#555555]">Company:</span>{' '}
                    <span className="text-[#FFFFFF]">{b.company || 'N/A'}</span>
                  </div>
                </div>

                {b.notes && (
                  <div className="p-2 rounded bg-[#141414] text-xs text-[#8A8A8A]">
                    Note: {b.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
