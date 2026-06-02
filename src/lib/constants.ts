export const AGENT_STATUSES = [
  'idle', 'thinking', 'researching', 'writing', 'waiting',
  'collaborating', 'reviewing', 'error', 'completed'
] as const;

export type AgentStatus = typeof AGENT_STATUSES[number];

export const STATUS_CONFIG: Record<AgentStatus, { color: string; label: string; bgColor: string; glowColor: string }> = {
  idle: { color: '#6b7280', label: 'Idle', bgColor: 'rgba(107, 114, 128, 0.15)', glowColor: 'rgba(107, 114, 128, 0.3)' },
  thinking: { color: '#a855f7', label: 'Thinking', bgColor: 'rgba(168, 85, 247, 0.15)', glowColor: 'rgba(168, 85, 247, 0.3)' },
  researching: { color: '#3b82f6', label: 'Researching', bgColor: 'rgba(59, 130, 246, 0.15)', glowColor: 'rgba(59, 130, 246, 0.3)' },
  writing: { color: '#06b6d4', label: 'Writing', bgColor: 'rgba(6, 182, 212, 0.15)', glowColor: 'rgba(6, 182, 212, 0.3)' },
  waiting: { color: '#f59e0b', label: 'Waiting', bgColor: 'rgba(245, 158, 11, 0.15)', glowColor: 'rgba(245, 158, 11, 0.3)' },
  collaborating: { color: '#06b6d4', label: 'Collaborating', bgColor: 'rgba(6, 182, 212, 0.15)', glowColor: 'rgba(6, 182, 212, 0.3)' },
  reviewing: { color: '#f97316', label: 'Reviewing', bgColor: 'rgba(249, 115, 22, 0.15)', glowColor: 'rgba(249, 115, 22, 0.3)' },
  error: { color: '#ef4444', label: 'Error', bgColor: 'rgba(239, 68, 68, 0.15)', glowColor: 'rgba(239, 68, 68, 0.3)' },
  completed: { color: '#22c55e', label: 'Completed', bgColor: 'rgba(34, 197, 94, 0.15)', glowColor: 'rgba(34, 197, 94, 0.3)' },
};

export const AGENT_ROLES = [
  'Researcher', 'Writer', 'Planner', 'Reviewer', 'Coder',
  'Designer', 'Analyst', 'Coordinator', 'Debugger', 'Summarizer'
] as const;

export const AGENT_AVATARS = ['🧠', '✍️', '🔍', '📊', '💻', '🎨', '📋', '🔗', '🛡️', '⚡'];

export const AGENT_TOOLS = [
  'Web Search', 'Code Interpreter', 'File Reader', 'API Caller',
  'Email Sender', 'Database Query', 'Browser', 'Calculator',
  'Image Generator', 'Text Analyzer'
] as const;

export const WORKFLOW_NODE_TYPES = [
  'agent', 'approval', 'apiCall', 'condition', 'delay',
  'database', 'webScraper', 'email', 'memory', 'fileProcessor'
] as const;

export const ACTIVITY_TYPES = [
  'task_started', 'task_completed', 'thinking', 'tool_call',
  'message_sent', 'error', 'delegation', 'output_ready',
  'approval_needed', 'collaboration'
] as const;

export type ActivityType = typeof ACTIVITY_TYPES[number];

export const ACTIVITY_MESSAGES: Record<ActivityType, string[]> = {
  task_started: [
    'Starting new task assignment...',
    'Beginning work on assigned objective...',
    'Initializing task pipeline...',
  ],
  task_completed: [
    'Task completed successfully',
    'Finished processing all items',
    'Output ready for review',
  ],
  thinking: [
    'Analyzing context and requirements...',
    'Evaluating multiple approaches...',
    'Processing information patterns...',
    'Reasoning through decision tree...',
    'Weighing options and trade-offs...',
  ],
  tool_call: [
    'Calling Web Search API...',
    'Executing code in sandbox...',
    'Reading file contents...',
    'Querying database...',
    'Browsing target URL...',
  ],
  message_sent: [
    'Sending update to Coordinator...',
    'Sharing findings with team...',
    'Requesting clarification...',
  ],
  error: [
    'Rate limit reached, retrying...',
    'API timeout, attempting recovery...',
    'Unexpected response format...',
  ],
  delegation: [
    'Delegating sub-task to specialist...',
    'Routing to appropriate agent...',
    'Assigning research component...',
  ],
  output_ready: [
    'Draft ready for human review',
    'Analysis complete — awaiting approval',
    'Results compiled and formatted',
  ],
  approval_needed: [
    'Awaiting human approval to proceed',
    'Review checkpoint reached',
    'Requires manual verification',
  ],
  collaboration: [
    'Syncing with peer agents...',
    'Merging outputs from team...',
    'Coordinating parallel tasks...',
  ],
};

export const TEMPLATE_PRESETS = [
  {
    id: 'research-team',
    name: 'Research Team',
    description: 'A team of agents that researches topics, gathers data, and compiles reports.',
    icon: '🔬',
    agents: 4,
    category: 'Research',
    color: '#3b82f6',
  },
  {
    id: 'content-team',
    name: 'Content Marketing',
    description: 'Researches trends, writes blogs, reviews SEO, and schedules posts.',
    icon: '📝',
    agents: 5,
    category: 'Marketing',
    color: '#8b5cf6',
  },
  {
    id: 'support-team',
    name: 'Customer Support',
    description: 'Handles tickets, classifies issues, drafts responses, and escalates.',
    icon: '🎧',
    agents: 3,
    category: 'Support',
    color: '#22c55e',
  },
  {
    id: 'coding-team',
    name: 'Coding Team',
    description: 'Plans features, writes code, reviews PRs, and runs tests.',
    icon: '💻',
    agents: 4,
    category: 'Engineering',
    color: '#06b6d4',
  },
  {
    id: 'seo-team',
    name: 'SEO Team',
    description: 'Audits pages, researches keywords, optimizes content, and tracks rankings.',
    icon: '🔎',
    agents: 3,
    category: 'Marketing',
    color: '#f59e0b',
  },
  {
    id: 'sales-team',
    name: 'Sales Outreach',
    description: 'Prospects leads, personalizes outreach, follows up, and tracks conversions.',
    icon: '📈',
    agents: 4,
    category: 'Sales',
    color: '#ef4444',
  },
  {
    id: 'social-team',
    name: 'Social Media',
    description: 'Monitors trends, creates content, schedules posts, and engages audience.',
    icon: '📱',
    agents: 3,
    category: 'Marketing',
    color: '#ec4899',
  },
  {
    id: 'devops-team',
    name: 'DevOps Team',
    description: 'Monitors infrastructure, handles deployments, manages incidents.',
    icon: '🔧',
    agents: 3,
    category: 'Engineering',
    color: '#f97316',
  },
];
