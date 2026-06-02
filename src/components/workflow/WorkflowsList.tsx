'use client';

import { useWorkflowStore } from '@/stores/workflowStore';
import { useUIStore } from '@/stores/uiStore';
import { motion } from 'framer-motion';
import { GitBranch, Play, Edit2, Plus, Sparkles, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { Node, Edge } from '@xyflow/react';

export default function WorkflowsList() {
  const { nodes, edges, isExecuting, setIsExecuting, initializeWorkflow, setNodes, setEdges } = useWorkflowStore();
  const { setCurrentView } = useUIStore();

  const handleOpenCanvas = () => {
    // If the workflow is empty, initialize it first
    if (nodes.length === 0) {
      initializeWorkflow();
    }
    setCurrentView('workflow-canvas');
  };

  const handleCreateEmpty = () => {
    setNodes([]);
    setEdges([]);
    setIsExecuting(false);
    setCurrentView('workflow-canvas');
  };

  const handleLoadSample = () => {
    initializeWorkflow();
    setCurrentView('workflow-canvas');
  };

  // Mock static pipelines list to select from
  const samplePipelines = [
    {
      id: 'current-active',
      name: 'Default Collaborative Swarm',
      description: 'Orchestrates a Researcher and Writer with Analyst quality review, and conditional retry flows.',
      nodesCount: nodes.length > 0 ? nodes.length : 7,
      edgesCount: edges.length > 0 ? edges.length : 8,
      status: isExecuting ? 'running' : 'idle',
      lastRun: '10 minutes ago',
      isCustom: true,
    },
    {
      id: 'sentiment-analysis',
      name: 'Customer Feedback Sentiment Flow',
      description: 'Classifies customer reviews, generates tickets, and drafts notification replies automatically.',
      nodesCount: 5,
      edgesCount: 4,
      status: 'idle',
      lastRun: '2 hours ago',
      isCustom: false,
    },
    {
      id: 'seo-audit',
      name: 'SEO Page Analyzer Pipeline',
      description: 'Audits URL content, cross-checks keywords, and creates search engine optimization suggestions.',
      nodesCount: 4,
      edgesCount: 3,
      status: 'idle',
      lastRun: 'Yesterday',
      isCustom: false,
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <GitBranch className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
            Workflow Orchestrations
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Design, visualize, and monitor interactive step-by-step agent and approval flow pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateEmpty}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}
          >
            <Plus className="w-4 h-4" />
            Create Empty Pipeline
          </button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {samplePipelines.map((pipeline, idx) => (
          <motion.div
            key={pipeline.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl transition-all duration-200"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="flex items-start gap-4 flex-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: pipeline.status === 'running' ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <GitBranch className="w-6 h-6" style={{ color: pipeline.status === 'running' ? '#22c55e' : 'var(--text-secondary)' }} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {pipeline.name}
                  </h3>
                  {pipeline.isCustom && (
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: 'var(--accent-purple)',
                        border: '1px solid rgba(139, 92, 246, 0.25)',
                      }}
                    >
                      Swarm Editor Active
                    </span>
                  )}
                </div>
                <p className="text-xs max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                  {pipeline.description}
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    Nodes: <strong style={{ color: 'var(--text-secondary)' }}>{pipeline.nodesCount}</strong>
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    Edges: <strong style={{ color: 'var(--text-secondary)' }}>{pipeline.edgesCount}</strong>
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                    Last run: <strong style={{ color: 'var(--text-secondary)' }}>{pipeline.lastRun}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {pipeline.id === 'current-active' ? (
                <>
                  <button
                    onClick={() => setIsExecuting(!isExecuting)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      background: isExecuting ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      border: `1px solid ${isExecuting ? 'rgba(239, 68, 68, 0.25)' : 'rgba(34, 197, 94, 0.25)'}`,
                      color: isExecuting ? 'var(--status-error)' : 'var(--status-success)',
                    }}
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isExecuting ? 'Stop Execution' : 'Run Pipeline'}
                  </button>
                  <button
                    onClick={handleOpenCanvas}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                      color: 'white',
                      boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Open Canvas
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoadSample}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                >
                  Load into Swarm
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
