'use client';

import { motion } from 'framer-motion';
import {
  Search, Bell, Activity, Wifi, Moon, Sun,
  Command, PanelRight
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAgentStore } from '@/stores/agentStore';

export default function TopBar() {
  const { sidebarCollapsed, searchQuery, setSearchQuery, toggleContextPanel, isBeginnerMode, toggleMode } = useUIStore();
  const { agents } = useAgentStore();

  const activeAgents = agents.filter(a => !['idle', 'completed'].includes(a.status)).length;
  const totalTokens = agents.reduce((sum, a) => sum + a.tokensUsed, 0);

  return (
    <header
      className="fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-6 gap-4"
      style={{
        left: sidebarCollapsed ? 72 : 260,
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-xl flex-1 max-w-md"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Search agents, workflows, templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm flex-1"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
        />
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs"
          style={{
            background: 'var(--bg-hover)',
            color: 'var(--text-tertiary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {/* Live Stats */}
      <div className="flex items-center gap-4">
        {/* System Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Wifi className="w-3.5 h-3.5" style={{ color: 'var(--status-success)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--status-success)' }}>Live</span>
        </motion.div>

        {/* Active agents counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <Activity className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{activeAgents}</span> active
          </span>
        </div>

        {/* Token counter */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {(totalTokens / 1000).toFixed(1)}K
            </span> tokens
          </span>
        </div>

        {/* Mode toggle */}
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          style={{
            background: isBeginnerMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(139, 92, 246, 0.1)',
            border: `1px solid ${isBeginnerMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)'}`,
            color: isBeginnerMode ? 'var(--status-success)' : 'var(--accent-purple)',
          }}
        >
          <span className="text-xs font-medium">
            {isBeginnerMode ? '🟢 Beginner' : '🟣 Advanced'}
          </span>
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: 'var(--status-error)', color: 'white' }}
          >
            3
          </span>
        </button>

        {/* Context panel toggle */}
        <button
          onClick={toggleContextPanel}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <PanelRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
