import React, { useState } from 'react';
import { useT } from '../lib/prefs';
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
  const t = useT();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-sunken/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-panel border border-sine2 shadow-2xl overflow-hidden my-8">
        {/* Deal Room Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-sine bg-panel2/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-dim">
                <span className="text-accent font-mono font-medium">{t("DEAL ROOM #VC-JO-994")}</span>
                <span aria-hidden="true">·</span>
                <span className="text-ok flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("NDA Verified")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-ink leading-tight">
                {lang === 'ar' ? project.arabicName : project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-chip hover:bg-chip-hi text-dim hover:text-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-sine bg-panel2/40">
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
                  ? 'border-accent text-accent-hi bg-chip/40'
                  : 'border-transparent text-dim hover:text-ink2'
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
                <div className="p-3 rounded-xl bg-panel2 border border-sine">
                  <div className="text-xs text-dim">{t("Target Raise")}</div>
                  <div className="text-base font-bold text-ok tabular-nums mt-0.5">{project.targetCapital}</div>
                  <div className="text-xs text-faint mt-1">{t(project.stage)} {t("Equity Round")}</div>
                </div>
                <div className="p-3 rounded-xl bg-panel2 border border-sine">
                  <div className="text-xs text-dim">{t("Committed to Date")}</div>
                  <div className="text-base font-bold text-ink tabular-nums mt-0.5">$210,000 (50%)</div>
                  <div className="text-xs text-accent mt-1">{t("Lead Syndicate Active")}</div>
                </div>
                <div className="p-3 rounded-xl bg-panel2 border border-sine">
                  <div className="text-xs text-dim">{t("Minimum Ticket")}</div>
                  <div className="text-base font-bold text-ink2 tabular-nums mt-0.5">$25,000</div>
                  <div className="text-xs text-faint mt-1">{t("Accredited Only")}</div>
                </div>
                <div className="p-3 rounded-xl bg-panel2 border border-sine">
                  <div className="text-xs text-dim">{t("Governance Level")}</div>
                  <div className="text-base font-bold text-accent-hi tabular-nums mt-0.5">{project.completeness}% {t("Verified")}</div>
                  <div className="text-xs text-ok mt-1">{t("Admin Audit Passed")}</div>
                </div>
              </div>

              {/* Founder & Business Context */}
              <div className="p-4 rounded-xl bg-panel2/60 border border-sine flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-ink font-bold text-lg shrink-0">
                  {project.founder.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{project.founder.name}</h4>
                  <div className="text-xs text-accent">{t(project.founder.role)} · {t(project.locationName)}</div>
                  <p className="text-xs text-ink2 mt-1.5 leading-relaxed">{t(project.founder.priorBackground)}</p>
                </div>
              </div>

              {/* Key Investment Highlights */}
              <div>
                <h5 className="text-xs font-semibold text-ink2 uppercase tracking-wider mb-2">{t("Vetted Highlights")}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-panel2 border border-sine text-ink2">
                      <CheckCircle2 className="w-4 h-4 text-ok shrink-0" />
                      <span>{t(hl)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Soft Commitment Simulator */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-accent/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-ink">{t("Simulate Investment Allocation")}</h5>
                    <p className="text-xs text-dim mt-0.5">{t("Test allocation into this vetted Jordan venture round without legal binding.")}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={commitmentAmount}
                      onChange={(e) => setCommitmentAmount(Number(e.target.value))}
                      className="bg-panel2 border border-sine2 text-xs text-ink rounded-lg px-3 py-2 outline-none"
                    >
                      <option value={25000}>{t("$25,000 Ticket")}</option>
                      <option value={50000}>{t("$50,000 Ticket")}</option>
                      <option value={100000}>{t("$100,000 Lead Ticket")}</option>
                    </select>

                    <button
                      onClick={handleCommitment}
                      className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hi text-on-accent font-bold text-xs transition-colors whitespace-nowrap"
                    >
                      {t("Issue Soft Term Sheet")}
                    </button>
                  </div>
                </div>

                {commitmentSuccess && (
                  <div className="mt-3 p-2.5 rounded-lg bg-ok/10 border border-ok/40 text-ok text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ok shrink-0" />
                    <span>{t("Soft commitment for")} ${commitmentAmount.toLocaleString()} {t("recorded. Added to Syndicate Deal Room queue!")}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'diligence' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-sine text-xs text-dim">
                <span>{t("Verified Legal & Financial Repository")}</span>
                <span>{t("SHA-256 Checksum Certified")}</span>
              </div>

              {[
                { name: 'Certificate of Commercial Registration (Ministry of Industry & Trade)', date: 'Verified 14 Days Ago', size: '2.4 MB PDF' },
                { name: 'Deloitte Amman 24-Month Independent Financial Audit', date: 'Verified 30 Days Ago', size: '5.1 MB PDF' },
                { name: 'Commercial Real Estate Site Leases (Abdali & Dabouq)', date: 'Verified 10 Days Ago', size: '3.8 MB PDF' },
                { name: 'Intellectual Property & Trademark Deed (Hashemite Kingdom)', date: 'Verified 45 Days Ago', size: '1.2 MB PDF' },
                { name: 'Executive Financial Model (2026-2029 Projections)', date: 'Updated Yesterday', size: '4.6 MB XLSX' },
                { name: 'Founder Clean Criminal & Credit Clearance Certificate', date: 'Verified 7 Days Ago', size: '840 KB PDF' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-panel2 border border-sine hover:border-sine2 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-accent shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-ink">{t(doc.name)}</div>
                      <div className="text-xs text-dim">{doc.date} · {doc.size}</div>
                    </div>
                  </div>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-chip hover:bg-chip-hi text-xs text-ink2 border border-sine2">
                    <Download className="w-3.5 h-3.5" />
                    <span>{t("Inspect")}</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'captable' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-panel2 border border-sine">
                <h5 className="text-sm font-bold text-ink mb-3">{t("Pre vs Post-Money Equity Breakdown")}</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-ink2 mb-1">
                      <span>{t("Founding Team & ESOP Pool")}</span>
                      <span className="font-mono">72.0%</span>
                    </div>
                    <div className="w-full h-2 bg-chip rounded-full overflow-hidden">
                      <div className="h-full bg-info rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-ink2 mb-1">
                      <span>{t("Previous Angel Backers (Amman Syndicate)")}</span>
                      <span className="font-mono">10.0%</span>
                    </div>
                    <div className="w-full h-2 bg-chip rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-ink2 mb-1">
                      <span>{t("New Round Allocation")} ({t(project.stage)})</span>
                      <span className="font-mono text-ok font-semibold">18.0%</span>
                    </div>
                    <div className="w-full h-2 bg-chip rounded-full overflow-hidden">
                      <div className="h-full bg-ok rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-panel2/60 border border-sine">
                  <span className="text-dim block">{t("Pre-Money Valuation")}</span>
                  <span className="text-base font-bold text-ink font-mono mt-0.5">{t("$2,100,000 USD")}</span>
                </div>
                <div className="p-3 rounded-lg bg-panel2/60 border border-sine">
                  <span className="text-dim block">{t("Post-Money Valuation")}</span>
                  <span className="text-base font-bold text-ok font-mono mt-0.5">
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
                  <div key={idx} className="p-3.5 rounded-xl bg-panel2 border border-sine">
                    <div className="flex items-center justify-between text-xs text-dim mb-1.5">
                      <span className="font-semibold text-accent">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-xs text-ink2 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t("Type an encrypted message to the syndicate...")}
                  className="flex-1 bg-panel2 border border-sine2 rounded-xl px-4 py-2.5 text-xs text-ink placeholder-slate-500 outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("Send")}</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-sine bg-panel2/60 text-xs text-dim">
          <span>{t("Protected under Jordan Electronic Transactions Law #15")}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-chip hover:bg-chip-hi text-ink2 text-xs transition-colors"
          >
            {t("Close Deal Room")}
          </button>
        </div>
      </div>
    </div>
  );
};
