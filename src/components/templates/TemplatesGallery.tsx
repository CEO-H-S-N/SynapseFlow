'use client';

import { useState } from 'react';
import { TEMPLATE_PRESETS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Sparkles, Bot, GitBranch, Terminal, ArrowRight } from 'lucide-react';
import { useAgentStore } from '@/stores/agentStore';
import { useWorkflowStore } from '@/stores/workflowStore';
import { useActivityStore } from '@/stores/activityStore';
import { useUIStore } from '@/stores/uiStore';
import { generateId } from '@/lib/utils';
import { Node, Edge } from '@xyflow/react';

export default function TemplatesGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { setAgents } = useAgentStore();
  const { setNodes, setEdges, setIsExecuting } = useWorkflowStore();
  const { clearActivities, addActivity } = useActivityStore();
  const { setCurrentView, addNotification } = useUIStore();

  const categories = ['All', 'Research', 'Marketing', 'Support', 'Engineering', 'Sales'];

  const filteredPresets = activeCategory === 'All'
    ? TEMPLATE_PRESETS
    : TEMPLATE_PRESETS.filter(p => p.category === activeCategory);

  const handleDeployTemplate = (presetId: string) => {
    // Deploy specific agent swarms based on template
    let newAgents = [];
    let newNodes: Node[] = [];
    let newEdges: Edge[] = [];

    if (presetId === 'research-team') {
      newAgents = [
        {
          id: 'res-1',
          name: 'Atlas',
          avatar: '🧠',
          role: 'Planner',
          status: 'idle' as const,
          currentTask: 'Awaiting deployment',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Calculator'],
          lastOutput: 'Initialized research swarm.',
          health: 'good' as const,
          model: 'GPT-4o',
          memory: ['Project directives'],
          personality: 'Strategic coordinator.',
          goal: 'Map information pipelines and coordinate research assets.',
        },
        {
          id: 'res-2',
          name: 'Nova',
          avatar: '🔍',
          role: 'Researcher',
          status: 'idle' as const,
          currentTask: 'Ready to scrape keywords',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Web Search', 'Browser'],
          lastOutput: 'Swarm active.',
          health: 'good' as const,
          model: 'Claude Sonnet',
          memory: ['Target keywords'],
          personality: 'Meticulous investigator.',
          goal: 'Query web search and retrieve target source pages.',
        },
        {
          id: 'res-3',
          name: 'Oracle',
          avatar: '📊',
          role: 'Analyst',
          status: 'idle' as const,
          currentTask: 'Ready to process facts',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Text Analyzer'],
          lastOutput: 'Ready.',
          health: 'good' as const,
          model: 'Gemini Pro',
          memory: ['Data parameters'],
          personality: 'Analytical and factual.',
          goal: 'Analyze scraped page documents and build statistical summaries.',
        },
        {
          id: 'res-4',
          name: 'Scribe',
          avatar: '✍️',
          role: 'Writer',
          status: 'idle' as const,
          currentTask: 'Ready to compile document',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Text Analyzer'],
          lastOutput: 'Standing by.',
          health: 'good' as const,
          model: 'GPT-4o Mini',
          memory: ['Template rules'],
          personality: 'Descriptive summarizer.',
          goal: 'Compile reports into high-level Markdown format.',
        }
      ];

      newNodes = [
        {
          id: 'res-node-1',
          type: 'agentNode',
          position: { x: 50, y: 150 },
          data: { label: 'Atlas (Planner)', status: 'idle', avatar: '🧠', role: 'Planner' },
        },
        {
          id: 'res-node-2',
          type: 'agentNode',
          position: { x: 300, y: 50 },
          data: { label: 'Nova (Researcher)', status: 'idle', avatar: '🔍', role: 'Researcher' },
        },
        {
          id: 'res-node-3',
          type: 'agentNode',
          position: { x: 300, y: 250 },
          data: { label: 'Oracle (Analyst)', status: 'idle', avatar: '📊', role: 'Analyst' },
        },
        {
          id: 'res-node-4',
          type: 'approvalNode',
          position: { x: 550, y: 150 },
          data: { label: 'Human Review', status: 'waiting' },
        },
        {
          id: 'res-node-5',
          type: 'agentNode',
          position: { x: 800, y: 150 },
          data: { label: 'Scribe (Writer)', status: 'idle', avatar: '✍️', role: 'Writer' },
        }
      ];

      newEdges = [
        { id: 're-1', source: 'res-node-1', target: 'res-node-2', animated: true, style: { stroke: '#3b82f6' } },
        { id: 're-2', source: 'res-node-1', target: 'res-node-3', animated: true, style: { stroke: '#3b82f6' } },
        { id: 're-3', source: 'res-node-2', target: 'res-node-4', animated: true, style: { stroke: '#3b82f6' } },
        { id: 're-4', source: 'res-node-3', target: 'res-node-4', animated: true, style: { stroke: '#3b82f6' } },
        { id: 're-5', source: 'res-node-4', target: 'res-node-5', animated: true, style: { stroke: '#22c55e' } }
      ];
    } else if (presetId === 'coding-team') {
      newAgents = [
        {
          id: 'code-1',
          name: 'Architect',
          avatar: '🧠',
          role: 'Planner',
          status: 'idle' as const,
          currentTask: 'Ready to design schema',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['File Reader'],
          lastOutput: 'Swarm active.',
          health: 'good' as const,
          model: 'GPT-4o',
          memory: [],
          personality: 'Strategic engineer.',
          goal: 'Draft system architectures and OpenAPI specifications.',
        },
        {
          id: 'code-2',
          name: 'Synthesizer',
          avatar: '💻',
          role: 'Coder',
          status: 'idle' as const,
          currentTask: 'Ready to write implementation',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Code Interpreter', 'File Reader'],
          lastOutput: 'Standing by.',
          health: 'good' as const,
          model: 'Claude Sonnet',
          memory: [],
          personality: 'Logical scriptwriter.',
          goal: 'Develop functional modules and database drivers.',
        },
        {
          id: 'code-3',
          name: 'Sentinel',
          avatar: '🛡️',
          role: 'Reviewer',
          status: 'idle' as const,
          currentTask: 'Ready to analyze code quality',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Text Analyzer', 'File Reader'],
          lastOutput: 'Ready.',
          health: 'good' as const,
          model: 'Gemini Pro',
          memory: [],
          personality: 'Meticulous auditor.',
          goal: 'Audit source branches, search for vulnerabilities, and run lint checks.',
        },
        {
          id: 'code-4',
          name: 'Conductor',
          avatar: '🔗',
          role: 'Coordinator',
          status: 'idle' as const,
          currentTask: 'Ready to orchestrate tests',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['API Caller'],
          lastOutput: 'Standing by.',
          health: 'good' as const,
          model: 'GPT-4o Mini',
          memory: [],
          personality: 'Release coordinator.',
          goal: 'Manage continuous integration tasks and trigger Webhooks.',
        }
      ];

      newNodes = [
        {
          id: 'code-node-1',
          type: 'agentNode',
          position: { x: 50, y: 150 },
          data: { label: 'Architect (Planner)', status: 'idle', avatar: '🧠', role: 'Planner' },
        },
        {
          id: 'code-node-2',
          type: 'agentNode',
          position: { x: 300, y: 150 },
          data: { label: 'Synthesizer (Coder)', status: 'idle', avatar: '💻', role: 'Coder' },
        },
        {
          id: 'code-node-3',
          type: 'agentNode',
          position: { x: 550, y: 150 },
          data: { label: 'Sentinel (Reviewer)', status: 'idle', avatar: '🛡️', role: 'Reviewer' },
        },
        {
          id: 'code-node-4',
          type: 'conditionNode',
          position: { x: 800, y: 150 },
          data: { label: 'Quality Check', condition: 'errors === 0' },
        },
        {
          id: 'code-node-5',
          type: 'agentNode',
          position: { x: 1050, y: 50 },
          data: { label: 'Conductor (Coordinator)', status: 'idle', avatar: '🔗', role: 'Coordinator' },
        },
        {
          id: 'code-node-6',
          type: 'approvalNode',
          position: { x: 1050, y: 250 },
          data: { label: 'Manual Re-evaluation', status: 'waiting' },
        }
      ];

      newEdges = [
        { id: 'ce-1', source: 'code-node-1', target: 'code-node-2', animated: true, style: { stroke: '#06b6d4' } },
        { id: 'ce-2', source: 'code-node-2', target: 'code-node-3', animated: true, style: { stroke: '#06b6d4' } },
        { id: 'ce-3', source: 'code-node-3', target: 'code-node-4', animated: true, style: { stroke: '#06b6d4' } },
        { id: 'ce-4', source: 'code-node-4', target: 'code-node-5', animated: true, style: { stroke: '#22c55e' }, label: 'Pass' },
        { id: 'ce-5', source: 'code-node-4', target: 'code-node-6', animated: true, style: { stroke: '#ef4444' }, label: 'Fail' },
        { id: 'ce-6', source: 'code-node-6', target: 'code-node-2', animated: false, style: { stroke: '#f59e0b', strokeDasharray: '5,5' } }
      ];
    } else {
      // Fallback fallback / simple team
      newAgents = [
        {
          id: 'gen-1',
          name: 'Atlas',
          avatar: '🧠',
          role: 'Planner',
          status: 'idle' as const,
          currentTask: 'Ready',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: [],
          lastOutput: 'Ready to work.',
          health: 'good' as const,
          model: 'GPT-4o',
          memory: [],
          personality: 'Strategic coordinator.',
          goal: 'Plan swarm executions.',
        },
        {
          id: 'gen-2',
          name: 'Scribe',
          avatar: '✍️',
          role: 'Writer',
          status: 'idle' as const,
          currentTask: 'Ready',
          progress: 0,
          tokensUsed: 0,
          timeSpent: 0,
          activeTools: ['Text Analyzer'],
          lastOutput: 'Deployed.',
          health: 'good' as const,
          model: 'Claude Sonnet',
          memory: [],
          personality: 'Descriptive writer.',
          goal: 'Produce swarm outputs.',
        }
      ];

      newNodes = [
        {
          id: 'gen-node-1',
          type: 'agentNode',
          position: { x: 100, y: 150 },
          data: { label: 'Atlas (Planner)', status: 'idle', avatar: '🧠', role: 'Planner' },
        },
        {
          id: 'gen-node-2',
          type: 'agentNode',
          position: { x: 400, y: 150 },
          data: { label: 'Scribe (Writer)', status: 'idle', avatar: '✍️', role: 'Writer' },
        }
      ];

      newEdges = [
        { id: 'ge-1', source: 'gen-node-1', target: 'gen-node-2', animated: true, style: { stroke: '#8b5cf6' } }
      ];
    }

    // Deploy!
    setAgents(newAgents);
    setNodes(newNodes);
    setEdges(newEdges);
    setIsExecuting(false);
    clearActivities();

    addActivity({
      id: generateId(),
      agentId: 'system',
      agentName: 'System Swarm',
      agentAvatar: '⚡',
      type: 'task_started',
      message: `System: Deployed the ${TEMPLATE_PRESETS.find(p => p.id === presetId)?.name || 'Custom'} agent swarm template.`,
      timestamp: new Date(),
    });

    addNotification({
      id: generateId(),
      type: 'success',
      message: `${TEMPLATE_PRESETS.find(p => p.id === presetId)?.name} template instantiated successfully!`,
      timestamp: new Date(),
      read: false,
    });

    // Go to dashboard to see active agents!
    setCurrentView('dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
            Swarm Presets Gallery
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            One-click deploy pre-configured team agents and workflow pipelines for typical use-cases.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: activeCategory === cat ? 'var(--accent-purple)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPresets.map((preset, idx) => (
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ y: -3 }}
            className="flex flex-col rounded-2xl p-5 cursor-default transition-all duration-300 group"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid var(--border-subtle)`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: `${preset.color}15`,
                  boxShadow: `0 0 15px ${preset.color}20`,
                  border: `1px solid ${preset.color}30`
                }}
              >
                {preset.icon}
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `${preset.color}10`,
                  color: preset.color,
                  border: `1px solid ${preset.color}25`
                }}
              >
                {preset.category}
              </span>
            </div>

            {/* Title & Desc */}
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {preset.name}
            </h3>
            <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
              {preset.description}
            </p>

            {/* Info Row */}
            <div className="flex items-center gap-4 py-3 mt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{preset.agents} Agents Swarm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Custom Graph</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => handleDeployTemplate(preset.id)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 mt-2"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${preset.color}15`;
                e.currentTarget.style.borderColor = preset.color;
                e.currentTarget.style.color = preset.color;
                e.currentTarget.style.boxShadow = `0 0 15px ${preset.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Deploy swarm pipeline</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
