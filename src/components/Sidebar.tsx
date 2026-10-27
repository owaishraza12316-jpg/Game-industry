import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  GraduationCap,
  Landmark,
  Scale,
  CloudSunRain,
  Target,
  Tv,
  Building2,
  Handshake,
  Music,
  ShieldCheck,
  Compass,
  Crown,
  CalendarDays,
  Trophy,
  Newspaper,
  MessageSquare,
  Globe2,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface SidebarProps {
  collapsed: boolean;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  unreadNewsCount?: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard Hub', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'crisis', label: 'Crisis Management', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'facilities', label: '4D Facilities & HQ', icon: <Eye className="w-4 h-4" /> },
  { id: 'tactics', label: 'Match Tactics', icon: <Target className="w-4 h-4" /> },
  { id: 'market', label: 'Global Player Market', icon: <Globe2 className="w-4 h-4" /> },
  { id: 'squad', label: 'Squad & Contracts', icon: <Users className="w-4 h-4" /> },
  { id: 'captaincy', label: 'Split Captaincy', icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 'coaching', label: 'Coaching Trees', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'finance', label: 'Audit & Tax Ledger', icon: <Landmark className="w-4 h-4" /> },
  { id: 'poaching', label: 'NOC & Poaching', icon: <Scale className="w-4 h-4" /> },
  { id: 'curator', label: 'Pitch & Weather', icon: <CloudSunRain className="w-4 h-4" /> },
  { id: 'broadcast', label: 'Broadcasting Rights', icon: <Tv className="w-4 h-4" /> },
  { id: 'stadiums', label: 'Stadium Infrastructure', icon: <Building2 className="w-4 h-4" /> },
  { id: 'sponsors', label: 'Commercial Sponsors', icon: <Handshake className="w-4 h-4" /> },
  { id: 'catering', label: 'Catering & DJ Sound', icon: <Music className="w-4 h-4" /> },
  { id: 'umpires', label: 'Home Umpires & DRS', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'selection', label: 'Selection & Youth Pool', icon: <Compass className="w-4 h-4" /> },
  { id: 'vip', label: 'VIP Guests & Ceremonies', icon: <Crown className="w-4 h-4" /> },
  { id: 'fixtures', label: 'Fixtures & Calendar', icon: <CalendarDays className="w-4 h-4" /> },
  { id: 'rankings', label: 'ICC & Franchise Tables', icon: <Trophy className="w-4 h-4" /> },
  { id: 'news', label: 'Global News Wire', icon: <Newspaper className="w-4 h-4" /> },
  { id: 'cricketx', label: 'CricketX Outrage Feed', icon: <MessageSquare className="w-4 h-4" /> }
];

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  activeTab,
  onSelectTab,
  unreadNewsCount
}) => {
  return (
    <aside
      className={`h-[calc(100vh-64px)] bg-slate-900/95 border-r border-slate-800 transition-all duration-300 flex flex-col shrink-0 z-20 overflow-y-auto select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-3">
        {!collapsed && (
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Board Administration
          </div>
        )}

        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  onSelectTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-transparent'
                } ${collapsed ? 'justify-center px-0' : 'justify-between'}`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.id === 'news' && unreadNewsCount && unreadNewsCount > 0 ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold">
                    {unreadNewsCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
