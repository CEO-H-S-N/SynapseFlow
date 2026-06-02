'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Wand2, Info } from 'lucide-react';
import { useAgentStore } from '@/stores/agentStore';
import { useActivityStore } from '@/stores/activityStore';
import { AGENT_AVATARS, AGENT_ROLES, AGENT_TOOLS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface AgentCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentCreator({ isOpen, onClose }: AgentCreatorProps) {
  const { addAgent } = useAgentStore();
  const { addActivity } = useActivityStore();

  const [name, setName] = useState('');
  const [role, setRole] = useState<typeof AGENT_ROLES[number]>(AGENT_ROLES[0]);
  const [avatar, setAvatar] = useState(AGENT_AVATARS[0]);
  const [model, setModel] = useState('GPT-4o');
  const [personality, setPersonality] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Simple auto-generate assistant to fill details based on role
  const handleAutoGenerate = () => {
    const defaultNamesMap: Record<string, string> = {
      Researcher: 'Seeker',
      Writer: 'Scribe',
      Planner: 'Strategist',
      Reviewer: 'Critic',
      Coder: 'Synthesizer',
      Designer: 'Artisan',
      Analyst: 'Oracle',
      Coordinator: 'Conductor',
      Debugger: 'Sentinel',
      Summarizer: 'Synapse',
    };

    const nameVal = defaultNamesMap[role] || 'Agent-' + Math.floor(Math.random() * 100);
    setName(nameVal);

    const defaultGoals: Record<string, string> = {
      Researcher: 'Search the web and gather in-depth, verified source material.',
      Writer: 'Generate engaging, accurate, and high-quality written material.',
      Planner: 'Organize project milestones and layout task execution graphs.',
      Reviewer: 'Evaluate output details, proofread content, and check criteria.',
      Coder: 'Write optimized, self-documenting code and microservice schemas.',
      Designer: 'Construct premium UI prototypes and generate dynamic visual assets.',
      Analyst: 'Evaluate incoming statistical trends and output insights.',
      Coordinator: 'Sync outputs between different departments and coordinate pipelines.',
      Debugger: 'Audit error logs, identify stack trace overflows, and fix code.',
      Summarizer: 'Condense long files and outputs into key bullets.',
    };
    setGoal(defaultGoals[role] || 'Help the team solve complex multi-agent tasks.');

    const defaultPersonalities: Record<string, string> = {
      Researcher: 'Thorough, investigative, and hyper-focused on facts.',
      Writer: 'Articulate, descriptive, creative, and style-adaptive.',
      Planner: 'Analytical, strategic, organized, and time-aware.',
      Reviewer: 'Meticulous, critical, constructively honest, and structured.',
      Coder: 'Logical, clean-code oriented, syntax-correct, and rapid.',
      Designer: 'Visually sensitive, modern, color-conscious, and creative.',
      Analyst: 'Quantitative, objective, pattern-aware, and precise.',
      Coordinator: 'Communicative, sync-focused, friendly, and team-oriented.',
      Debugger: 'Relentless, problem-solver, detail-oriented, and patient.',
      Summarizer: 'Concise, clear, high-level, and synthesis-capable.',
    };
    setPersonality(defaultPersonalities[role] || 'Efficient and adaptive AI agent.');

    // Auto-select avatar matching role
    const avatarIndexMap: Record<string, number> = {
      Planner: 0, // 🧠
      Researcher: 2, // 🔍
      Writer: 1, // ✍️
      Reviewer: 8, // 🛡️
      Coder: 4, // 💻
      Designer: 5, // 🎨
      Analyst: 3, // 📊
      Coordinator: 7, // 🔗
      Debugger: 9, // ⚡
      Summarizer: 6, // 📋
    };
    const avatarIdx = avatarIndexMap[role];
    if (avatarIdx !== undefined) {
      setAvatar(AGENT_AVATARS[avatarIdx]);
    }

    // Auto select tools
    const toolMap: Record<string, string[]> = {
      Researcher: ['Web Search', 'Browser', 'File Reader'],
      Writer: ['Text Analyzer'],
      Planner: ['Calculator'],
      Reviewer: ['Text Analyzer', 'File Reader'],
      Coder: ['Code Interpreter', 'Database Query', 'File Reader'],
      Designer: ['Image Generator'],
      Analyst: ['Calculator', 'Database Query', 'Text Analyzer'],
      Coordinator: ['API Caller'],
      Debugger: ['Code Interpreter', 'File Reader'],
      Summarizer: ['Text Analyzer', 'File Reader'],
    };
    setSelectedTools(toolMap[role] || []);
  };

  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent = {
      id: generateId(),
      name: name.trim(),
      avatar,
      role,
      status: 'idle' as const,
      currentTask: 'Ready for assignment',
      progress: 0,
      tokensUsed: 0,
      timeSpent: 0,
      activeTools: selectedTools,
      lastOutput: 'Created and deployed into swarm.',
      health: 'good' as const,
      model,
      memory: ['Swarm deployment initialization'],
      personality: personality || 'Adaptive intelligence.',
      goal: goal || 'Assist other agents.',
    };

    addAgent(newAgent);

    // Create activity event
    addActivity({
      id: generateId(),
      agentId: newAgent.id,
      agentName: newAgent.name,
      agentAvatar: newAgent.avatar,
      type: 'task_started',
      message: `${newAgent.name} has been spawned in the swarm as a ${newAgent.role}`,
      timestamp: new Date(),
    });

    onClose();

    // Reset fields
    setName('');
    setPersonality('');
    setGoal('');
    setSelectedTools([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-xl rounded-2xl glass-strong shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Spawn AI Agent
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg cursor-pointer transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Agent Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as typeof AGENT_ROLES[number])}
                    className="w-full px-3 py-2 rounded-xl text-sm border cursor-pointer outline-none transition-colors"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {AGENT_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Auto generate triggers */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAutoGenerate}
                    className="flex items-center gap-2 w-full justify-center px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      color: 'var(--accent-purple)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Auto-Fill Preset Details
                  </button>
                </div>
              </div>

              {/* Name & Avatar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Agent Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex, Nova, Titan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-sm border outline-none transition-colors"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Avatar
                  </label>
                  <div className="flex gap-1 overflow-x-auto p-1 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                    {AGENT_AVATARS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatar(emoji)}
                        className="w-8 h-8 flex items-center justify-center text-lg rounded-lg cursor-pointer transition-colors"
                        style={{
                          background: avatar === emoji ? 'var(--accent-purple)' : 'transparent',
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Model */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  LLM Model Brain
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['GPT-4o', 'Claude Sonnet', 'Gemini Pro', 'GPT-4o Mini'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModel(m)}
                      className="px-3 py-2 text-xs font-medium rounded-xl border cursor-pointer transition-all"
                      style={{
                        background: model === m ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-elevated)',
                        borderColor: model === m ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                        color: model === m ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                  Core Goal / Mission
                  <span title="The primary objective the agent will try to fulfill.">
                    <Info className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  </span>
                </label>
                <textarea
                  placeholder="e.g. Conduct deep competitive product research and extract key insights..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none transition-colors resize-none"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Personality */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Personality / Behavioral Style
                </label>
                <input
                  type="text"
                  placeholder="e.g. Direct, meticulous, and security-aware"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm border outline-none transition-colors"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Tools assignment */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Assign Capabilities / Tools
                </label>
                <div className="flex flex-wrap gap-2">
                  {AGENT_TOOLS.map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => handleToolToggle(tool)}
                        className="px-3 py-1.5 text-xs rounded-xl border cursor-pointer transition-all duration-200"
                        style={{
                          background: isSelected ? 'rgba(139, 92, 246, 0.12)' : 'var(--bg-elevated)',
                          borderColor: isSelected ? 'var(--accent-purple)' : 'var(--border-subtle)',
                          color: isSelected ? 'var(--accent-purple)' : 'var(--text-secondary)',
                        }}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 flex items-center justify-end gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  style={{
                    color: 'var(--text-secondary)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                    color: 'white',
                    opacity: name.trim() ? 1 : 0.6,
                    boxShadow: name.trim() ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Deploy Agent
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
