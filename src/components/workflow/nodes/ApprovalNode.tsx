'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

interface ApprovalNodeData {
  label: string;
  status?: string;
  [key: string]: unknown;
}

function ApprovalNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ApprovalNodeData;

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
          border: `2px solid ${selected ? '#f59e0b' : 'var(--border-subtle)'}`,
          boxShadow: selected ? '0 0 20px rgba(245, 158, 11, 0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(245, 158, 11, 0.15)' }}
          >
            <UserCheck className="w-4 h-4" style={{ color: '#f59e0b' }} />
          </div>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
            {nodeData.label}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#f59e0b' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px]" style={{ color: '#f59e0b' }}>
            Awaiting Approval
          </span>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: '#f59e0b' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !rounded-full !border-2"
        style={{ background: 'var(--bg-primary)', borderColor: '#f59e0b' }}
      />
    </motion.div>
  );
}

export const ApprovalNode = memo(ApprovalNodeComponent);
