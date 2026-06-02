'use client';

import { useEffect, useState, useRef } from 'react';
import { Agent } from '@/lib/mock-data';
import { STATUS_CONFIG } from '@/lib/constants';

interface ThinkingStreamProps {
  agent: Agent;
}

const THINKING_STEPS = [
  'Recalling context parameters from memory vector space...',
  'Extracting relevant semantic associations...',
  'Structuring reasoning outline using Tree-of-Thought search...',
  'Analyzing dependencies on active variables...',
  'Synthesizing output token probabilities...',
  'Refining semantic structure for human comprehension...',
  'Cross-checking constraints and boundaries...',
];

export default function ThinkingStream({ agent }: ThinkingStreamProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with a clean list of logs for this agent
    setLogs([
      `[sys] Initialized cognitive query context for ${agent.name}`,
      `[model] Selected brain: ${agent.model}`,
      `[personality] Loaded behavioral bias: ${agent.personality}`,
      `[objective] Pursuing goal: "${agent.goal}"`,
    ]);

    let timer: NodeJS.Timeout;
    let stepCount = 0;

    const addSimulatedStep = () => {
      if (stepCount >= THINKING_STEPS.length) {
        setLogs((prev) => [...prev, `[ready] Swarm update dispatch complete.`]);
        return;
      }

      const timestamp = new Date().toLocaleTimeString();
      const code = `[${timestamp}] ${THINKING_STEPS[stepCount]}`;
      setLogs((prev) => [...prev, code]);
      stepCount++;

      // Schedule next log
      const delay = Math.random() * 2000 + 800;
      timer = setTimeout(addSimulatedStep, delay);
    };

    // First step trigger
    timer = setTimeout(addSimulatedStep, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [agent.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs.length]);

  return (
    <div className="rounded-xl p-3 space-y-2 border" style={{ background: '#07070c', borderColor: 'var(--border-subtle)' }}>
      <div className="flex items-center justify-between pb-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--status-thinking)' }}>
          Thinking Stream
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: 'var(--status-thinking)' }} />
          <span className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>Live CPU Swarm</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[160px] overflow-y-auto space-y-1 font-mono text-[10px] leading-relaxed scrollbar-thin"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {logs.map((log, i) => {
          let color = 'rgba(255,255,255,0.6)';
          if (log.startsWith('[sys]')) color = 'var(--text-tertiary)';
          else if (log.startsWith('[model]')) color = 'var(--accent-cyan)';
          else if (log.startsWith('[ready]')) color = 'var(--status-success)';
          else if (log.includes('Tree-of-Thought') || log.includes('cognitive')) color = 'var(--status-thinking)';

          return (
            <div key={i} style={{ color }}>
              {log}
            </div>
          );
        })}
      </div>
    </div>
  );
}
