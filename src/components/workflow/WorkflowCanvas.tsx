'use client';

import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflowStore } from '@/stores/workflowStore';
import { AgentNode } from './nodes/AgentNode';
import { ApprovalNode } from './nodes/ApprovalNode';
import { ConditionNode } from './nodes/ConditionNode';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Download, Upload } from 'lucide-react';

const nodeTypes = {
  agentNode: AgentNode,
  approvalNode: ApprovalNode,
  conditionNode: ConditionNode,
};

export default function WorkflowCanvas() {
  const { initializeWorkflow, isExecuting, setIsExecuting } = useWorkflowStore();
  const defaultNodes = useWorkflowStore((s) => s.nodes);
  const defaultEdges = useWorkflowStore((s) => s.edges);

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  useEffect(() => {
    initializeWorkflow();
  }, []);

  useEffect(() => {
    if (defaultNodes.length > 0) {
      setNodes(defaultNodes);
    }
    if (defaultEdges.length > 0) {
      setEdges(defaultEdges);
    }
  }, [defaultNodes, defaultEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: '#8b5cf6' } }, eds)
      );
    },
    [setEdges]
  );

  return (
    <div className="h-full w-full relative rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)', minHeight: 'calc(100vh - 7rem)' }}>
      {/* Toolbar */}
      <div
        className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(18, 18, 26, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <button
          onClick={() => setIsExecuting(!isExecuting)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
          style={{
            background: isExecuting ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
            color: isExecuting ? '#ef4444' : '#22c55e',
            border: `1px solid ${isExecuting ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
          }}
        >
          {isExecuting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isExecuting ? 'Stop' : 'Run'}
        </button>

        <div className="w-px h-5" style={{ background: 'var(--border-subtle)' }} />

        <button
          className="p-1.5 rounded-lg cursor-pointer transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded-lg cursor-pointer transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          title="Add node"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Execution indicator */}
      {isExecuting && (
        <motion.div
          className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
          <span className="text-xs font-medium" style={{ color: '#22c55e' }}>
            Executing Workflow...
          </span>
        </motion.div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        style={{ background: 'var(--bg-primary)' }}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#8b5cf6', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="var(--border-subtle)"
        />
        <Controls
          showInteractive={false}
          style={{
            bottom: 16,
            left: 16,
          }}
        />
        <MiniMap
          nodeColor={() => 'var(--accent-purple)'}
          maskColor="rgba(10, 10, 15, 0.8)"
          style={{
            bottom: 16,
            right: 16,
            width: 150,
            height: 100,
          }}
        />
      </ReactFlow>
    </div>
  );
}
