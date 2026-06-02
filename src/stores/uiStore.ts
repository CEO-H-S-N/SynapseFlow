import { create } from 'zustand';

interface UIStore {
  sidebarCollapsed: boolean;
  contextPanelOpen: boolean;
  currentView: 'dashboard' | 'agents' | 'workflows' | 'workflow-canvas' | 'analytics' | 'templates' | 'settings';
  isBeginnerMode: boolean;
  searchQuery: string;
  notifications: Notification[];
  isAuthenticated: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleContextPanel: () => void;
  setContextPanelOpen: (open: boolean) => void;
  setCurrentView: (view: UIStore['currentView']) => void;
  toggleMode: () => void;
  setSearchQuery: (query: string) => void;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  setAuthenticated: (auth: boolean) => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  contextPanelOpen: false,
  currentView: 'dashboard',
  isBeginnerMode: true,
  searchQuery: '',
  notifications: [],
  isAuthenticated: false, // Default to false for premium simulated login experience

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleContextPanel: () => set((state) => ({ contextPanelOpen: !state.contextPanelOpen })),
  setContextPanelOpen: (open) => set({ contextPanelOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
  toggleMode: () => set((state) => ({ isBeginnerMode: !state.isBeginnerMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  clearNotifications: () => set({ notifications: [] }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));
