import { create } from 'zustand';
import { Agent, createMockAgents } from '@/lib/mock-data';
import { AgentStatus } from '@/lib/constants';

interface AgentStore {
  agents: Agent[];
  selectedAgentId: string | null;
  setAgents: (agents: Agent[]) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  selectAgent: (id: string | null) => void;
  getSelectedAgent: () => Agent | undefined;
  initializeAgents: () => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  selectedAgentId: null,

  setAgents: (agents) => set({ agents }),

  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...updates } : agent
      ),
    })),

  addAgent: (agent) =>
    set((state) => ({ agents: [...state.agents, agent] })),

  removeAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id),
      selectedAgentId: state.selectedAgentId === id ? null : state.selectedAgentId,
    })),

  selectAgent: (id) => set({ selectedAgentId: id }),

  getSelectedAgent: () => {
    const state = get();
    return state.agents.find((a) => a.id === state.selectedAgentId);
  },

  initializeAgents: () => {
    const agents = createMockAgents();
    set({ agents });
  },
}));
