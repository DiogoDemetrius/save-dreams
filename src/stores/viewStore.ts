import { create } from 'zustand';

type View = 'dashboard' | 'clients' | 'servers' | 'finance' | 'admins' | 'settings';

interface ViewState {
  currentView: View;
  setView: (view: View) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  currentView: 'dashboard',
  setView: (view) => set({ currentView: view }),
}));