'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bot, GitBranch, BarChart3,
  Blocks, Settings, ChevronLeft, ChevronRight,
  Zap, Sparkles
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAgentStore } from '@/stores/agentStore';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'workflows', label: 'Workflows', icon: GitBranch },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'templates', label: 'Templates', icon: Blocks },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentView, setCurrentView } = useUIStore();
  const { agents } = useAgentStore();
  const activeCount = agents.filter(a => !['idle', 'completed'].includes(a.status)).length;

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{
        background: 'rgba(12, 12, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 gap-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          }}
        >
          <Zap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="gradient-text">Synapse</span>
                <span style={{ color: 'var(--text-primary)' }}>Flow</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer relative group"
              style={{
                background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                  style={{ background: 'var(--accent-purple)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* AI Status */}
      <div className="px-3 py-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-3 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--accent-purple)' }}>
                  AI System Active
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--status-success)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  {activeCount > 0 ? activeCount : agents.length} agents {activeCount > 0 ? 'active' : 'standby'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          style={{
            color: 'var(--text-tertiary)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
