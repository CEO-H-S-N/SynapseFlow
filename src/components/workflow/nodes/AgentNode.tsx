'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { STATUS_CONFIG, AgentStatus } from '@/lib/constants';

interface AgentNodeData {
  label: string;
  status: AgentStatus;
  avatar: string;
  role: string;
  [key: string]: unknown;
}

function AgentNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as AgentNodeData;
  const config = STATUS_CONFIG[nodeData.status] || STATUS_CONFIG.idle;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="px-4 py-3 rounded-xl min-w-[180px]"
        style={{
          background: 'var(--bg-secondary)',
          border: `2px solid ${selected ? config.color : 'var(--border-subtle)'}`,
          boxShadow: selected ? `0 0 20px ${config.glowColor}` : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ background: config.bgColor }}
          >
            {nodeData.avatar}
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              {nodeData.label}
            </div>
            <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              {nodeData.role}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: config.color }}
            animate={nodeData.status !== 'idle' ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium" style={{ color: config.color }}>
            {config.label}
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: config.color }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: config.color }}
      />
    </motion.div>
  );
}

export const AgentNode = memo(AgentNodeComponent);
