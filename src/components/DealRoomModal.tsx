import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  FileText, 
  DollarSign, 
  Users, 
  Download, 
  Send, 
  CheckCircle2, 
  PieChart, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { VentureProject } from '../data/jordanVentures';

interface Props {
  project: VentureProject;
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'ar';
}

export const DealRoomModal: React.FC<Props> = ({ project, isOpen, onClose, lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'diligence' | 'captable' | 'discussions'>('overview');
  const [messages, setMessages] = useState([
    {
      sender: 'Zaid Al-Sharif (Lead Syndicate Angel)',
      time: '10:45 AM',
      text: 'We reviewed the Q3 financial audit for the expansion sites. EBITDA margins at 31% look solid. We are ready to lead with $150k.'
    },
    {
      sender: 'Founder (' + project.founder.name + ')',
      time: '11:15 AM',
      text: 'Thank you Zaid. The site leases in Abdali and Dabouq have preliminary approvals pending final capital close.'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [commitmentAmount, setCommitmentAmount] = useState(50000);
  const [commitmentSuccess, setCommitmentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        sender: 'You (Accredited Investor)',
        time: 'Just now',
        text: newMessage
      }
    ]);
    setNewMessage('');
  };

  const handleCommitment = () => {
    setCommitmentSuccess(true);
    setTimeout(() => setCommitmentSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0B111E] border border-slate-700 shadow-2xl overflow-hidden my-8">
        {/* Deal Room Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-cyan-400 font-mono font-medium">DEAL ROOM #VC-JO-994</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDA Verified
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {lang === 'ar' ? project.arabicName : project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-800 bg-slate-900/40">
          {[
            { id: 'overview', label: 'Overview & Terms' },
            { id: 'diligence', label: 'Due Diligence Vault (6 Docs)' },
            { id: 'captable', label: 'Cap Table Simulation' },
            { id: 'discussions', label: 'Confidential Syndicate Chat' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top key metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Target Raise</div>
                  <div className="text-base font-bold text-emerald-400 tabular-nums mt-0.5">{project.targetCapital}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{project.stage} Equity Round</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Committed to Date</div>
                  <div className="text-base font-bold text-white tabular-nums mt-0.5">$210,000 (50%)</div>
                  <div className="text-[10px] text-cyan-400 mt-1">Lead Syndicate Active</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Minimum Ticket</div>
                  <div className="text-base font-bold text-slate-200 tabular-nums mt-0.5">$25,000</div>
                  <div className="text-[10px] text-slate-500 mt-1">Accredited Only</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Governance Level</div>
                  <div className="text-base font-bold text-cyan-300 tabular-nums mt-0.5">{project.completeness}% Verified</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Admin Audit Passed</div>
                </div>
              </div>

              {/* Founder & Business Context */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {project.founder.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{project.founder.name}</h4>
                  <div className="text-xs text-cyan-400">{project.founder.role} · {project.locationName}</div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{project.founder.priorBackground}</p>
                </div>
              </div>

              {/* Key Investment Highlights */}
              <div>
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Vetted Highlights</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Soft Commitment Simulator */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white">Simulate Investment Allocation</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Test allocation into this vetted Jordan venture round without legal binding.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={commitmentAmount}
                      onChange={(e) => setCommitmentAmount(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 outline-none"
                    >
                      <option value={25000}>$25,000 Ticket</option>
                      <option value={50000}>$50,000 Ticket</option>
                      <option value={100000}>$100,000 Lead Ticket</option>
                    </select>

                    <button
                      onClick={handleCommitment}
                      className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap"
                    >
                      Issue Soft Term Sheet
                    </button>
                  </div>
                </div>

                {commitmentSuccess && (
                  <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Soft commitment for ${commitmentAmount.toLocaleString()} recorded. Added to Syndicate Deal Room queue!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'diligence' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                <span>Verified Legal & Financial Repository</span>
                <span>SHA-256 Checksum Certified</span>
              </div>

              {[
                { name: 'Certificate of Commercial Registration (Ministry of Industry & Trade)', date: 'Verified 14 Days Ago', size: '2.4 MB PDF' },
                { name: 'Deloitte Amman 24-Month Independent Financial Audit', date: 'Verified 30 Days Ago', size: '5.1 MB PDF' },
                { name: 'Commercial Real Estate Site Leases (Abdali & Dabouq)', date: 'Verified 10 Days Ago', size: '3.8 MB PDF' },
                { name: 'Intellectual Property & Trademark Deed (Hashemite Kingdom)', date: 'Verified 45 Days Ago', size: '1.2 MB PDF' },
                { name: 'Executive Financial Model (2026-2029 Projections)', date: 'Updated Yesterday', size: '4.6 MB XLSX' },
                { name: 'Founder Clean Criminal & Credit Clearance Certificate', date: 'Verified 7 Days Ago', size: '840 KB PDF' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">{doc.name}</div>
                      <div className="text-[11px] text-slate-400">{doc.date} · {doc.size}</div>
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700">
                    <Download className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'captable' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h5 className="text-sm font-bold text-white mb-3">Pre vs Post-Money Equity Breakdown</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                      <span>Founding Team & ESOP Pool</span>
                      <span className="font-mono">72.0%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                      <span>Previous Angel Backers (Amman Syndicate)</span>
                      <span className="font-mono">10.0%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                      <span>New Round Allocation ({project.stage})</span>
                      <span className="font-mono text-emerald-400 font-semibold">18.0%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Pre-Money Valuation</span>
                  <span className="text-base font-bold text-white font-mono mt-0.5">$2,100,000 USD</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block">Post-Money Valuation</span>
                  <span className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    ${(2100000 + project.capitalAmountUSD).toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="font-semibold text-cyan-400">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type an encrypted message to the syndicate..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900/60 text-xs text-slate-400">
          <span>Protected under Jordan Electronic Transactions Law #15</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
          >
            Close Deal Room
          </button>
        </div>
      </div>
    </div>
  );
};
