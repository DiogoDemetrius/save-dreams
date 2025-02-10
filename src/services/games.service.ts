import { apiRequest } from './api';
import type { Game } from '../types';

export interface GameFilters {
  genre?: string;
  search?: string;
  sort?: 'rating' | 'name' | 'recent';
}

export interface GameSession {
  id: string;
  gameId: string;
  status: 'starting' | 'running' | 'ended';
  connectionInfo: {
    ip: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

export const gamesService = {
  async getGames(filters?: GameFilters): Promise<Game[]> {
    const params = new URLSearchParams();
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);

    return apiRequest(`/games?${params.toString()}`);
  },

  async startGameSession(gameId: string): Promise<GameSession> {
    return apiRequest('/games/session/start', {
      method: 'POST',
      body: JSON.stringify({ gameId }),
    });
  },

  async endGameSession(sessionId: string): Promise<void> {
    return apiRequest(`/games/session/${sessionId}/end`, {
      method: 'POST',
    });
  },

  async getGameSession(sessionId: string): Promise<GameSession> {
    return apiRequest(`/games/session/${sessionId}`);
  },
};