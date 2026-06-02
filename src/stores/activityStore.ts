import { create } from 'zustand';
import { ActivityEvent, createMockActivities } from '@/lib/mock-data';
import { Agent } from '@/lib/mock-data';

interface ActivityStore {
  activities: ActivityEvent[];
  maxActivities: number;
  addActivity: (activity: ActivityEvent) => void;
  setActivities: (activities: ActivityEvent[]) => void;
  clearActivities: () => void;
  initializeActivities: (agents: Agent[]) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  maxActivities: 100,

  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities].slice(0, state.maxActivities),
    })),

  setActivities: (activities) => set({ activities }),

  clearActivities: () => set({ activities: [] }),

  initializeActivities: (agents) => {
    const activities = createMockActivities(agents);
    set({ activities: activities.reverse() });
  },
}));
