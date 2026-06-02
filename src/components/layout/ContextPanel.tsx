'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Clock, Zap, Cpu, Shield, Brain, Wrench } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAgentStore } from '@/stores/agentStore';
import { STATUS_CONFIG } from '@/lib/constants';
import { formatTokens, formatTime } from '@/lib/utils';
import ActivityFeed from '@/components/activity/ActivityFeed';
import ThinkingStream from '@/components/activity/ThinkingStream';

export default function ContextPanel() {
  const { contextPanelOpen, setContextPanelOpen } = useUIStore();
  const { selectedAgentId, agents } = useAgentStore();
  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <AnimatePresence>
      {contextPanelOpen && (
        <motion.aside
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed right-0 top-16 bottom-0 w-[340px] z-30 flex flex-col"
          style={{
            background: 'rgba(12, 12, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <h2 className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {selectedAgent ? 'Agent Details' : 'Activity Stream'}
            </h2>
            <button
              onClick={() => setContextPanelOpen(false)}
              className="p-1.5 rounded-lg cursor-pointer transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedAgent ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Agent header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: STATUS_CONFIG[selectedAgent.status].bgColor,
                    boxShadow: `0 0 20px ${STATUS_CONFIG[selectedAgent.status].glowColor}`,
                  }}
                >
                  {selectedAgent.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {selectedAgent.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {selectedAgent.role}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: STATUS_CONFIG[selectedAgent.status].color }}
                  />
                  <span className="text-sm font-medium" style={{ color: STATUS_CONFIG[selectedAgent.status].color }}>
                    {STATUS_CONFIG[selectedAgent.status].label}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {selectedAgent.currentTask}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tokens</span>
                  </div>
                  <p className="text-lg font-bold">{formatTokens(selectedAgent.tokensUsed)}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-cyan)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Time</span>
                  </div>
                  <p className="text-lg font-bold">{formatTime(selectedAgent.timeSpent)}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5" style={{ color: 'var(--status-working)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Model</span>
                  </div>
                  <p className="text-sm font-medium">{selectedAgent.model}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Shield className="w-3.5 h-3.5" style={{ color: 'var(--status-success)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Health</span>
                  </div>
                  <p className="text-sm font-medium capitalize">{selectedAgent.health}</p>
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                  <Wrench className="w-3.5 h-3.5" />
                  Active Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.activeTools.length > 0 ? selectedAgent.activeTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    >
                      {tool}
                    </span>
                  )) : (
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>No active tools</span>
                  )}
                </div>
              </div>

              {/* Memory */}
              <div>
                <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                  <Brain className="w-3.5 h-3.5" />
                  Memory
                </h4>
                <div className="space-y-1">
                  {selectedAgent.memory.map((mem, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                      {mem}
                    </div>
                  ))}
                </div>
              </div>

              {/* Personality & Goal */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Personality</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedAgent.personality}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium mb-1" style={{ color: 'var(--text-tertiary)' }}>Goal</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedAgent.goal}</p>
                </div>
              </div>

              {/* Thinking stream for active statuses */}
              {['thinking', 'researching', 'writing', 'reviewing', 'collaborating'].includes(selectedAgent.status) && (
                <ThinkingStream agent={selectedAgent} />
              )}

              {/* Last output */}
              <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Last Output</h4>
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                  &ldquo;{selectedAgent.lastOutput}&rdquo;
                </p>
              </div>
            </div>
          ) : (
            <ActivityFeed />
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
