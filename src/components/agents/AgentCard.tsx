'use client';

import { motion } from 'framer-motion';
import { Agent } from '@/lib/mock-data';
import { STATUS_CONFIG } from '@/lib/constants';
import { formatTokens, formatTime } from '@/lib/utils';
import {
  Clock, Cpu, Activity, Zap, MoreHorizontal,
  Pause, Play, RotateCcw, Eye
} from 'lucide-react';
import { useAgentStore } from '@/stores/agentStore';
import { useState } from 'react';

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const { selectAgent, selectedAgentId } = useAgentStore();
  const config = STATUS_CONFIG[agent.status];
  const isSelected = selectedAgentId === agent.id;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={() => selectAgent(agent.id)}
      className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 group"
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${isSelected ? config.color : 'var(--border-subtle)'}`,
        boxShadow: isSelected ? `0 0 30px ${config.glowColor}` : 'none',
      }}
    >
      {/* Status glow overlay */}
      {agent.status !== 'idle' && agent.status !== 'completed' && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ background: config.color }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar with status ring */}
          <div className="relative">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: config.bgColor }}
            >
              {agent.avatar}
            </div>
            {/* Animated status ring */}
            {agent.status !== 'idle' && (
              <motion.div
                className="absolute -inset-1 rounded-xl pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ border: `2px solid ${config.color}` }}
              />
            )}
            {/* Health dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{
                borderColor: 'var(--bg-secondary)',
                background: agent.health === 'good' ? 'var(--status-success)' :
                            agent.health === 'warning' ? 'var(--status-warning)' : 'var(--status-error)',
              }}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {agent.name}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {agent.role} · {agent.model}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ background: config.bgColor, color: config.color }}
          animate={agent.status !== 'idle' && agent.status !== 'completed' ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {agent.status !== 'idle' && agent.status !== 'completed' && (
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: config.color }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {config.label}
        </motion.div>
      </div>

      {/* Current task */}
      <div className="mb-3 relative z-10">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {agent.currentTask}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-3 relative z-10">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Progress</span>
          <span className="text-xs font-medium" style={{ color: config.color }}>{agent.progress}%</span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: 'var(--bg-hover)' }}
        >
          <motion.div
            className="h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${agent.progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${config.color}, ${config.color}dd)`,
            }}
          >
            {/* Shimmer effect on active progress */}
            {agent.progress > 0 && agent.progress < 100 && (
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                  backgroundSize: '200% 100%',
                }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Active tools */}
      {agent.activeTools.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
          {agent.activeTools.map((tool) => (
            <span
              key={tool}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium"
              style={{
                background: 'var(--bg-hover)',
                color: 'var(--text-tertiary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between pt-3 relative z-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-1" title="Tokens used">
          <Zap className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {formatTokens(agent.tokensUsed)}
          </span>
        </div>
        <div className="flex items-center gap-1" title="Time spent">
          <Clock className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {formatTime(agent.timeSpent)}
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1 rounded-md transition-colors cursor-pointer"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            title="Pause agent"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1 rounded-md transition-colors cursor-pointer"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            title="View details"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Last output preview */}
      <div className="mt-3 pt-3 relative z-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <p className="text-xs italic truncate" style={{ color: 'var(--text-tertiary)' }}>
          &ldquo;{agent.lastOutput}&rdquo;
        </p>
      </div>

      {/* Typing indicator for active agents */}
      {(agent.status === 'thinking' || agent.status === 'writing') && (
        <div className="mt-2 flex items-center gap-2 relative z-10">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
            {agent.status === 'thinking' ? 'Processing...' : 'Generating...'}
          </span>
        </div>
      )}
    </motion.div>
  );
}
