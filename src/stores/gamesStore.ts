import { create } from 'zustand';
import { gamesService, type GameFilters, type GameSession } from '../services/games.service';
import type { Game } from '../types';

interface GamesState {
  games: Game[];
  activeSession: GameSession | null;
  isLoading: boolean;
  filters: GameFilters;
  loadGames: (filters?: GameFilters) => Promise<void>;
  startGame: (gameId: string) => Promise<void>;
  endGame: (sessionId: string) => Promise<void>;
  setFilters: (filters: GameFilters) => void;
}

export const useGamesStore = create<GamesState>((set, get) => ({
  games: [],
  activeSession: null,
  isLoading: false,
  filters: {},

  loadGames: async (filters) => {
    set({ isLoading: true });
    try {
      const games = await gamesService.getGames(filters);
      set({ games, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  startGame: async (gameId) => {
    set({ isLoading: true });
    try {
      const session = await gamesService.startGameSession(gameId);
      set({ activeSession: session, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  endGame: async (sessionId) => {
    try {
      await gamesService.endGameSession(sessionId);
      set({ activeSession: null });
    } catch (error) {
      throw error;
    }
  },

  setFilters: (filters) => {
    set({ filters });
    get().loadGames(filters);
  },
}));