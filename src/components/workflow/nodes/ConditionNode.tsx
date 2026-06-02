'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

interface ConditionNodeData {
  label: string;
  condition?: string;
  [key: string]: unknown;
}

function ConditionNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ConditionNodeData;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="px-4 py-3 rounded-xl min-w-[160px]"
        style={{
          background: 'var(--bg-secondary)',
          border: `2px solid ${selected ? '#8b5cf6' : 'var(--border-subtle)'}`,
          boxShadow: selected ? '0 0 20px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(139, 92, 246, 0.15)' }}
          >
            <GitBranch className="w-4 h-4" style={{ color: '#8b5cf6' }} />
          </div>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            {nodeData.label}
          </div>
        </div>
        {nodeData.condition && (
          <div
            className="text-[10px] px-2 py-1 rounded-md mt-1.5"
            style={{
              background: 'var(--bg-hover)',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            if ({nodeData.condition})
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: '#8b5cf6' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="pass"
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: '#22c55e', top: '35%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="fail"
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: '#ef4444', top: '65%' }}
      />
    </motion.div>
  );
}

export const ConditionNode = memo(ConditionNodeComponent);
