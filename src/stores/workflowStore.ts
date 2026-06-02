import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

interface WorkflowStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  isExecuting: boolean;
  executingNodeIds: string[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  setIsExecuting: (executing: boolean) => void;
  setExecutingNodeIds: (ids: string[]) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  initializeWorkflow: () => void;
}

const DEFAULT_NODES: Node[] = [
  {
    id: 'input-1',
    type: 'agentNode',
    position: { x: 100, y: 100 },
    data: { label: 'Research Agent', status: 'researching', avatar: '🔍', role: 'Researcher' },
  },
  {
    id: 'process-1',
    type: 'agentNode',
    position: { x: 400, y: 50 },
    data: { label: 'Writer Agent', status: 'writing', avatar: '✍️', role: 'Writer' },
  },
  {
    id: 'process-2',
    type: 'agentNode',
    position: { x: 400, y: 200 },
    data: { label: 'Analyst Agent', status: 'thinking', avatar: '📊', role: 'Analyst' },
  },
  {
    id: 'approval-1',
    type: 'approvalNode',
    position: { x: 700, y: 100 },
    data: { label: 'Human Review', status: 'waiting' },
  },
  {
    id: 'condition-1',
    type: 'conditionNode',
    position: { x: 950, y: 100 },
    data: { label: 'Quality Check', condition: 'score > 85' },
  },
  {
    id: 'output-1',
    type: 'agentNode',
    position: { x: 1200, y: 50 },
    data: { label: 'Publisher Agent', status: 'idle', avatar: '📤', role: 'Publisher' },
  },
  {
    id: 'retry-1',
    type: 'agentNode',
    position: { x: 1200, y: 200 },
    data: { label: 'Reviser Agent', status: 'idle', avatar: '🔄', role: 'Reviser' },
  },
];

const DEFAULT_EDGES: Edge[] = [
  { id: 'e1-2', source: 'input-1', target: 'process-1', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e1-3', source: 'input-1', target: 'process-2', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e2-4', source: 'process-1', target: 'approval-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e3-4', source: 'process-2', target: 'approval-1', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e4-5', source: 'approval-1', target: 'condition-1', animated: true, style: { stroke: '#22c55e' } },
  { id: 'e5-6', source: 'condition-1', target: 'output-1', animated: false, style: { stroke: '#22c55e' }, label: 'Pass' },
  { id: 'e5-7', source: 'condition-1', target: 'retry-1', animated: false, style: { stroke: '#ef4444' }, label: 'Fail' },
  { id: 'e7-2', source: 'retry-1', target: 'process-1', animated: false, style: { stroke: '#f59e0b', strokeDasharray: '5,5' } },
];

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isExecuting: false,
  executingNodeIds: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setIsExecuting: (executing) => set({ isExecuting: executing }),
  setExecutingNodeIds: (ids) => set({ executingNodeIds: ids }),
  onNodesChange: () => {},
  onEdgesChange: () => {},
  initializeWorkflow: () => set({ nodes: DEFAULT_NODES, edges: DEFAULT_EDGES }),
}));
