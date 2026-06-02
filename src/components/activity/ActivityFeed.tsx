'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useActivityStore } from '@/stores/activityStore';
import { useEffect, useRef } from 'react';
import {
  Play, CheckCircle2, Brain, Wrench,
  MessageSquare, AlertCircle, ArrowRight,
  FileOutput, ShieldQuestion, Users
} from 'lucide-react';

const ACTIVITY_ICONS: Record<string, { icon: any; color: string }> = {
  task_started: { icon: Play, color: '#3b82f6' },
  task_completed: { icon: CheckCircle2, color: '#22c55e' },
  thinking: { icon: Brain, color: '#a855f7' },
  tool_call: { icon: Wrench, color: '#06b6d4' },
  message_sent: { icon: MessageSquare, color: '#8b5cf6' },
  error: { icon: AlertCircle, color: '#ef4444' },
  delegation: { icon: ArrowRight, color: '#f59e0b' },
  output_ready: { icon: FileOutput, color: '#22c55e' },
  approval_needed: { icon: ShieldQuestion, color: '#f97316' },
  collaboration: { icon: Users, color: '#06b6d4' },
};

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function ActivityFeed() {
  const { activities } = useActivityStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activities.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--status-success)' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Live Activity
          </h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)' }}>
          {activities.length} events
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <AnimatePresence initial={false}>
          {activities.map((activity) => {
            const iconConfig = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.task_started;
            const Icon = iconConfig.icon;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-start gap-3 p-2.5 rounded-xl group transition-colors"
                style={{ cursor: 'default' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 mt-0.5"
                  style={{ background: `${iconConfig.color}15` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: iconConfig.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm">{activity.agentAvatar}</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      {activity.agentName}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {activity.message.replace(`${activity.agentName}: `, '')}
                  </p>
                </div>

                {/* Timestamp */}
                <span className="text-[10px] flex-shrink-0 mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  {getTimeAgo(activity.timestamp)}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: 'var(--bg-elevated)' }}>
              <Brain className="w-6 h-6" style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No activity yet</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Agent events will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
