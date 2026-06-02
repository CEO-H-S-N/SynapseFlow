import { AgentStatus, AGENT_AVATARS, AGENT_ROLES, AGENT_TOOLS } from './constants';
import { generateId } from './utils';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: AgentStatus;
  currentTask: string;
  progress: number;
  tokensUsed: number;
  timeSpent: number;
  activeTools: string[];
  lastOutput: string;
  health: 'good' | 'warning' | 'critical';
  model: string;
  memory: string[];
  personality: string;
  goal: string;
}

export interface ActivityEvent {
  id: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  type: string;
  message: string;
  timestamp: Date;
  details?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  agents: number;
  category: string;
  color: string;
}

const TASK_DESCRIPTIONS = [
  'Analyzing market trends for Q3 report',
  'Drafting blog post on AI automation',
  'Reviewing competitor pricing data',
  'Compiling research findings',
  'Optimizing SEO meta descriptions',
  'Generating social media calendar',
  'Processing customer feedback data',
  'Building executive summary',
  'Validating data integrity',
  'Creating visual assets for campaign',
  'Debugging API integration issues',
  'Writing technical documentation',
  'Monitoring system performance',
  'Classifying support tickets',
];

const LAST_OUTPUTS = [
  'Found 23 relevant articles on the topic...',
  'Draft section 2 complete: "The Future of AI Agents"...',
  'Identified 5 key competitor strategies...',
  'Generated 3 alternative approaches for review...',
  'SEO score improved from 72 to 89...',
  'Compiled 150 data points across 12 sources...',
  'Classification accuracy: 94.2% on test set...',
  'API response time reduced by 35%...',
];

export function createMockAgents(): Agent[] {
  return [
    {
      id: generateId(),
      name: 'Atlas',
      avatar: '🧠',
      role: 'Planner',
      status: 'thinking',
      currentTask: 'Planning workflow execution strategy',
      progress: 45,
      tokensUsed: 12500,
      timeSpent: 180,
      activeTools: ['Web Search', 'Calculator'],
      lastOutput: 'Identified 3 parallel task paths for optimization...',
      health: 'good',
      model: 'GPT-4o',
      memory: ['Previous research context', 'Team capabilities'],
      personality: 'Strategic and methodical',
      goal: 'Orchestrate and optimize team workflow',
    },
    {
      id: generateId(),
      name: 'Nova',
      avatar: '🔍',
      role: 'Researcher',
      status: 'researching',
      currentTask: 'Analyzing market trends for Q3 report',
      progress: 62,
      tokensUsed: 28300,
      timeSpent: 420,
      activeTools: ['Web Search', 'Browser', 'Text Analyzer'],
      lastOutput: 'Found 23 relevant articles on AI agent platforms...',
      health: 'good',
      model: 'Claude Sonnet',
      memory: ['Market research data', 'Industry benchmarks'],
      personality: 'Thorough and detail-oriented',
      goal: 'Gather comprehensive market intelligence',
    },
    {
      id: generateId(),
      name: 'Quill',
      avatar: '✍️',
      role: 'Writer',
      status: 'writing',
      currentTask: 'Drafting blog post on AI automation',
      progress: 78,
      tokensUsed: 45200,
      timeSpent: 560,
      activeTools: ['Text Analyzer'],
      lastOutput: 'Draft section 4 complete: "Implementation Best Practices"...',
      health: 'good',
      model: 'GPT-4o',
      memory: ['Brand voice guide', 'Previous articles'],
      personality: 'Creative and articulate',
      goal: 'Produce engaging, SEO-optimized content',
    },
    {
      id: generateId(),
      name: 'Sentinel',
      avatar: '🛡️',
      role: 'Reviewer',
      status: 'reviewing',
      currentTask: 'Reviewing code changes for PR #142',
      progress: 30,
      tokensUsed: 8700,
      timeSpent: 95,
      activeTools: ['Code Interpreter', 'File Reader'],
      lastOutput: 'Found 2 potential issues in error handling...',
      health: 'warning',
      model: 'Gemini Pro',
      memory: ['Code standards', 'Security checklist'],
      personality: 'Meticulous and security-focused',
      goal: 'Ensure code quality and security standards',
    },
    {
      id: generateId(),
      name: 'Pixel',
      avatar: '🎨',
      role: 'Designer',
      status: 'idle',
      currentTask: 'Waiting for content brief',
      progress: 0,
      tokensUsed: 3200,
      timeSpent: 45,
      activeTools: [],
      lastOutput: 'Created 4 social media templates...',
      health: 'good',
      model: 'DALL-E 3',
      memory: ['Brand guidelines', 'Asset library'],
      personality: 'Visual and creative',
      goal: 'Create compelling visual assets',
    },
    {
      id: generateId(),
      name: 'Cipher',
      avatar: '💻',
      role: 'Coder',
      status: 'thinking',
      currentTask: 'Architecting microservice for data pipeline',
      progress: 15,
      tokensUsed: 18900,
      timeSpent: 230,
      activeTools: ['Code Interpreter', 'File Reader', 'Database Query'],
      lastOutput: 'Designed schema for event-driven architecture...',
      health: 'good',
      model: 'Claude Sonnet',
      memory: ['System architecture docs', 'API specs'],
      personality: 'Logical and efficient',
      goal: 'Build reliable and scalable code',
    },
    {
      id: generateId(),
      name: 'Nexus',
      avatar: '🔗',
      role: 'Coordinator',
      status: 'collaborating',
      currentTask: 'Syncing outputs between research and writing teams',
      progress: 55,
      tokensUsed: 9100,
      timeSpent: 150,
      activeTools: ['API Caller'],
      lastOutput: 'Successfully routed research findings to Writer...',
      health: 'good',
      model: 'GPT-4o Mini',
      memory: ['Team workflow state', 'Dependency graph'],
      personality: 'Organized and communicative',
      goal: 'Keep all agents in sync and productive',
    },
    {
      id: generateId(),
      name: 'Spark',
      avatar: '⚡',
      role: 'Analyst',
      status: 'completed',
      currentTask: 'Performance analysis complete',
      progress: 100,
      tokensUsed: 34500,
      timeSpent: 380,
      activeTools: [],
      lastOutput: 'Final report: 23% improvement in pipeline throughput...',
      health: 'good',
      model: 'Gemini Pro',
      memory: ['Historical metrics', 'Benchmark data'],
      personality: 'Data-driven and precise',
      goal: 'Extract actionable insights from data',
    },
  ];
}

export function createMockActivities(agents: Agent[]): ActivityEvent[] {
  const activities: ActivityEvent[] = [];
  const now = new Date();

  const events = [
    { agentIdx: 1, type: 'task_started', message: 'Nova started researching market trends', offset: -300 },
    { agentIdx: 5, type: 'thinking', message: 'Cipher evaluating architecture options...', offset: -280 },
    { agentIdx: 0, type: 'thinking', message: 'Atlas analyzing workflow dependencies...', offset: -250 },
    { agentIdx: 1, type: 'tool_call', message: 'Nova calling Web Search API...', offset: -220 },
    { agentIdx: 2, type: 'task_started', message: 'Quill beginning draft of blog post', offset: -200 },
    { agentIdx: 6, type: 'collaboration', message: 'Nexus syncing research data to writers...', offset: -180 },
    { agentIdx: 3, type: 'task_started', message: 'Sentinel starting code review for PR #142', offset: -150 },
    { agentIdx: 1, type: 'output_ready', message: 'Nova compiled 23 relevant research articles', offset: -120 },
    { agentIdx: 2, type: 'thinking', message: 'Quill structuring article outline...', offset: -100 },
    { agentIdx: 5, type: 'tool_call', message: 'Cipher executing database schema migration...', offset: -80 },
    { agentIdx: 7, type: 'task_completed', message: 'Spark completed performance analysis', offset: -60 },
    { agentIdx: 3, type: 'error', message: 'Sentinel detected potential security issue in auth module', offset: -40 },
    { agentIdx: 0, type: 'delegation', message: 'Atlas delegating SEO review to specialized agent', offset: -20 },
    { agentIdx: 2, type: 'output_ready', message: 'Quill finished draft section 4 — ready for review', offset: -5 },
  ];

  events.forEach((event) => {
    const agent = agents[event.agentIdx];
    if (agent) {
      activities.push({
        id: generateId(),
        agentId: agent.id,
        agentName: agent.name,
        agentAvatar: agent.avatar,
        type: event.type,
        message: event.message,
        timestamp: new Date(now.getTime() + event.offset * 1000),
      });
    }
  });

  return activities;
}
