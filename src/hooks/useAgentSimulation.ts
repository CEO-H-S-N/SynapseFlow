import { useEffect, useRef } from 'react';
import { useAgentStore } from '@/stores/agentStore';
import { useActivityStore } from '@/stores/activityStore';
import { AgentStatus, ACTIVITY_MESSAGES, ActivityType } from '@/lib/constants';
import { randomBetween, randomItem, generateId } from '@/lib/utils';

const ACTIVE_STATUSES: AgentStatus[] = ['thinking', 'researching', 'writing', 'collaborating', 'reviewing'];
const ALL_STATUSES: AgentStatus[] = ['idle', 'thinking', 'researching', 'writing', 'waiting', 'collaborating', 'reviewing', 'completed'];

const TASK_MESSAGES: Record<AgentStatus, string[]> = {
  idle: ['Waiting for next assignment', 'Standing by', 'Ready for tasks'],
  thinking: ['Analyzing context and requirements...', 'Evaluating approaches...', 'Processing information...'],
  researching: ['Searching web for latest data...', 'Gathering information...', 'Scanning databases...'],
  writing: ['Drafting content section...', 'Composing response...', 'Generating output...'],
  waiting: ['Waiting for upstream data...', 'Pending approval...', 'Queued for processing...'],
  collaborating: ['Syncing with peer agents...', 'Sharing findings...', 'Coordinating tasks...'],
  reviewing: ['Checking output quality...', 'Validating results...', 'Running quality checks...'],
  error: ['Encountered an issue...', 'Retrying operation...', 'Error in processing...'],
  completed: ['Task completed successfully', 'All objectives met', 'Output finalized'],
};

export function useAgentSimulation() {
  const { agents, updateAgent } = useAgentStore();
  const { addActivity } = useActivityStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (agents.length === 0) return;

    intervalRef.current = setInterval(() => {
      // Pick a random agent to update
      const agentIndex = randomBetween(0, agents.length - 1);
      const agent = agents[agentIndex];
      if (!agent) return;

      // Determine what to update
      const updateType = Math.random();

      if (updateType < 0.3) {
        // Change status
        const newStatus = randomItem(ALL_STATUSES);
        const newTask = randomItem(TASK_MESSAGES[newStatus] || TASK_MESSAGES.idle);
        const newProgress = newStatus === 'completed' ? 100 :
                           newStatus === 'idle' ? 0 :
                           randomBetween(10, 95);

        updateAgent(agent.id, {
          status: newStatus,
          currentTask: newTask,
          progress: newProgress,
        });

        // Generate activity event
        const activityType: ActivityType = newStatus === 'completed' ? 'task_completed' :
                                          newStatus === 'thinking' ? 'thinking' :
                                          newStatus === 'error' ? 'error' :
                                          newStatus === 'collaborating' ? 'collaboration' :
                                          'task_started';

        const messages = ACTIVITY_MESSAGES[activityType];
        addActivity({
          id: generateId(),
          agentId: agent.id,
          agentName: agent.name,
          agentAvatar: agent.avatar,
          type: activityType,
          message: `${agent.name}: ${randomItem(messages)}`,
          timestamp: new Date(),
        });

      } else if (updateType < 0.6) {
        // Update progress
        const currentProgress = agent.progress;
        const newProgress = Math.min(100, currentProgress + randomBetween(1, 8));
        updateAgent(agent.id, { progress: newProgress });

        if (newProgress >= 100 && agent.status !== 'completed') {
          updateAgent(agent.id, {
            status: 'completed',
            currentTask: 'Task completed successfully',
            progress: 100,
          });
          addActivity({
            id: generateId(),
            agentId: agent.id,
            agentName: agent.name,
            agentAvatar: agent.avatar,
            type: 'task_completed',
            message: `${agent.name}: ${randomItem(ACTIVITY_MESSAGES.task_completed)}`,
            timestamp: new Date(),
          });
        }

      } else if (updateType < 0.8) {
        // Update tokens
        if (ACTIVE_STATUSES.includes(agent.status)) {
          updateAgent(agent.id, {
            tokensUsed: agent.tokensUsed + randomBetween(50, 500),
            timeSpent: agent.timeSpent + randomBetween(1, 5),
          });
        }

      } else {
        // Tool call activity
        if (ACTIVE_STATUSES.includes(agent.status) && agent.activeTools.length > 0) {
          addActivity({
            id: generateId(),
            agentId: agent.id,
            agentName: agent.name,
            agentAvatar: agent.avatar,
            type: 'tool_call',
            message: `${agent.name}: ${randomItem(ACTIVITY_MESSAGES.tool_call)}`,
            timestamp: new Date(),
          });
        }
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [agents.length]); // Only re-create when agents count changes
}
