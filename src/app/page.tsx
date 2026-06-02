'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import ContextPanel from '@/components/layout/ContextPanel';
import AgentGrid from '@/components/agents/AgentGrid';
import AgentCreator from '@/components/agents/AgentCreator';
import WorkflowsList from '@/components/workflow/WorkflowsList';
import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import TemplatesGallery from '@/components/templates/TemplatesGallery';

import { useUIStore } from '@/stores/uiStore';
import { useAgentStore } from '@/stores/agentStore';
import { useActivityStore } from '@/stores/activityStore';
import { useWorkflowStore } from '@/stores/workflowStore';
import { useAgentSimulation } from '@/hooks/useAgentSimulation';

import { motion } from 'framer-motion';
import {
  ShieldAlert, Settings, Key, Sliders, BellRing,
  HelpCircle, Sparkles, Cpu, Layers, Activity, Zap
} from 'lucide-react';

export default function SwarmDashboard() {
  const { currentView, sidebarCollapsed, contextPanelOpen, isAuthenticated, setAuthenticated } = useUIStore();
  const { agents, initializeAgents } = useAgentStore();
  const { initializeActivities } = useActivityStore();
  const { initializeWorkflow } = useWorkflowStore();

  const [isSpawnModalOpen, setIsSpawnModalOpen] = useState(false);

  // Simulated Login State
  const [loginEmail, setLoginEmail] = useState('admin@synapseflow.ai');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStep, setLoginStep] = useState('');

  // System Settings state
  const [openaiKey, setOpenaiKey] = useState('sk-••••••••••••••••••••');
  const [anthropicKey, setAnthropicKey] = useState('sk-ant-••••••••••••••••');
  const [simulationSpeed, setSimulationSpeed] = useState(2);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Cycle through simulated login steps
    const steps = [
      'Establishing neural connection...',
      'Authorizing terminal security token keys...',
      'Synchronizing agent swarm threads...',
      'Access Granted. Initializing visual Swarm OS GUI...'
    ];

    steps.forEach((stepText, idx) => {
      setTimeout(() => {
        setLoginStep(stepText);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setAuthenticated(true);
            setIsLoggingIn(false);
            setLoginStep('');
          }, 600);
        }
      }, (idx + 1) * 650);
    });
  };

  // Initialize stores
  useEffect(() => {
    initializeAgents();
    initializeWorkflow();
  }, []);

  // Initialize activities once agents are generated
  useEffect(() => {
    if (agents.length > 0) {
      initializeActivities(agents);
    }
  }, [agents.length > 0]); // Run once when agents are first loaded

  // Run the client-side swarm simulator
  useAgentSimulation();

  const activeAgentsCount = agents.filter(a => !['idle', 'completed'].includes(a.status)).length;
  const totalTokens = agents.reduce((sum, a) => sum + a.tokensUsed, 0);

  // Main content selector based on currentView store state
  const renderContentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Quick Overview Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Cpu className="w-16 h-16 text-cyan-400" />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Swarm Health</span>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>98.6%</h3>
                <p className="text-[10px] mt-1.5" style={{ color: 'var(--status-success)' }}>🟢 Swarm nodes healthy</p>
              </div>

              <div className="p-5 rounded-2xl glass relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Activity className="w-16 h-16 text-purple-400" />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Swarm Throughput</span>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activeAgentsCount > 0 ? (activeAgentsCount * 1.4).toFixed(1) : '0.0'}{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>tasks/min</span>
                </h3>
                <p className="text-[10px] mt-1.5" style={{ color: 'var(--accent-purple)' }}>⚡ Simulated pipeline running</p>
              </div>

              <div className="p-5 rounded-2xl glass relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-16 h-16 text-yellow-400" />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total Accumulation</span>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {(totalTokens / 1000).toFixed(1)}K{' '}
                  <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>tokens</span>
                </h3>
                <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>~ ${(totalTokens * 0.000015).toFixed(4)} spent</p>
              </div>

              <div className="p-5 rounded-2xl glass relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-16 h-16 text-emerald-400" />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Active Allocations</span>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{agents.length} Swarms</h3>
                <p className="text-[10px] mt-1.5" style={{ color: 'var(--status-success)' }}>🟢 Max capability allowed</p>
              </div>
            </div>

            {/* Swarm grid section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Agent Swarm
                </h2>
              </div>
              <AgentGrid onSpawnClick={() => setIsSpawnModalOpen(true)} />
            </div>
          </div>
        );
      case 'agents':
        return <AgentGrid onSpawnClick={() => setIsSpawnModalOpen(true)} />;
      case 'workflows':
        return <WorkflowsList />;
      case 'workflow-canvas':
        return <WorkflowCanvas />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'templates':
        return <TemplatesGallery />;
      case 'settings':
        return (
          <div className="max-w-2xl space-y-6">
            <div className="p-5 rounded-2xl glass">
              <h2 className="text-base font-semibold mb-1 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                <Key className="w-4 h-4 text-cyan-400" />
                API LLM Keys
              </h2>
              <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                SynapseFlow runs simulated workloads inside browser runtime. Provide keys for physical pipeline execution.
              </p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>OpenAI API Key</label>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-sm border outline-none transition-colors"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs" style={{ color: 'var(--text-secondary)' }}>Anthropic API Key</label>
                  <input
                    type="password"
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-sm border outline-none transition-colors"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass">
              <h2 className="text-base font-semibold mb-1 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                <Sliders className="w-4 h-4 text-purple-400" />
                Simulation engine
              </h2>
              <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                Configure pipeline simulation speeds. Higher intervals generate activity feeds faster.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>Simulation Speed</span>
                    <span className="font-semibold">{simulationSpeed}s / update</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Cognitive Logs Audio</h4>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Play micro-notification sound effects on events</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(239, 68, 68, 0.03)' }}>
              <h2 className="text-base font-semibold mb-1 flex items-center gap-2" style={{ color: 'var(--status-error)' }}>
                <ShieldAlert className="w-4 h-4" />
                System Safety Limits
              </h2>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                Orchestrate browser hardware constraints. Protect tabs from layout freeze caused by extensive agent threads.
              </p>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border hover:bg-red-500/10 transition-colors"
                style={{ color: 'var(--status-error)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
              >
                Flush Swap Swarm Memory
              </button>
            </div>
          </div>
        );
      default:
        return <div>Not found</div>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden" style={{ background: '#050508' }}>
        {/* Glowing background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--accent-purple)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px]" style={{ background: 'var(--accent-cyan)' }} />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl glass-strong relative z-10 space-y-6"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Logo header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-2xl mb-2"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
              }}
            >
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="gradient-text">Synapse</span>Flow
            </h1>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              Visual AI Swarm OS
            </p>
          </div>

          {isLoggingIn ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              {/* Spinner */}
              <div className="relative w-16 h-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-t-transparent"
                  style={{ borderColor: 'var(--accent-purple) var(--accent-purple) var(--accent-purple) transparent' }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border border-t-transparent"
                  style={{ borderColor: 'var(--accent-cyan) var(--accent-cyan) transparent transparent' }}
                />
                <Zap className="w-5 h-5 absolute inset-0 m-auto animate-pulse text-purple-400" />
              </div>
              <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                {loginStep}
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Swarm Terminal ID
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors"
                  style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Terminal Access Key
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors"
                  style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all mt-4"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                }}
              >
                Initialize Connection
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t" style={{ borderColor: 'var(--border-subtle)' }}></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase" style={{ color: 'var(--text-tertiary)' }}>Biometric Bypass</span>
                <div className="flex-grow border-t" style={{ borderColor: 'var(--border-subtle)' }}></div>
              </div>

              {/* Fingerprint / Biometric click */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors border hover:bg-zinc-900"
                style={{ background: 'transparent', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: '#22c55e' }} />
                <span>Simulate Fingerprint Biometrics</span>
              </button>
            </form>
          )}

          <div className="text-center">
            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              Demo access: admin@synapseflow.ai / password123
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{
          paddingLeft: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          paddingRight: contextPanelOpen ? 'var(--context-panel-width)' : '0px',
        }}
      >
        {/* Topbar */}
        <TopBar />

        {/* Dynamic content page */}
        <main className="flex-grow pt-24 px-6 pb-8 overflow-y-auto">
          {renderContentView()}
        </main>
      </div>

      {/* Context Sidebar */}
      <ContextPanel />

      {/* Spawner Modal */}
      <AgentCreator isOpen={isSpawnModalOpen} onClose={() => setIsSpawnModalOpen(false)} />
    </div>
  );
}
