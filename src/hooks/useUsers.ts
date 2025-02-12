import { useState, useCallback } from 'react';
import { User, UpdateUserIds, UpdateUserPlan, PlanType } from '../services/users';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'João Silva',
    email: 'joao@email.com',
    vmId: 'VM01',
    bmId: 'BM001',
    clientId: 'CLT001',
    plan: 'PRIORITY',
    planDaysRemaining: 25,
    planStartDate: '2024-03-01',
    planEndDate: '2024-03-31'
  },
  {
    id: 'USR002',
    name: 'Maria Santos',
    email: 'maria@email.com',
    vmId: 'VM02',
    bmId: 'BM001',
    clientId: 'CLT002',
    plan: 'BASIC',
    planDaysRemaining: 15,
    planStartDate: '2024-03-10',
    planEndDate: '2024-03-25'
  }
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(mockUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserIds = async (userId: string, ids: UpdateUserIds) => {
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(currentUsers => 
        currentUsers.map(user => 
          user.id === userId ? { ...user, ...ids } : user
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateUserPlan = async (userId: string, planData: UpdateUserPlan) => {
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(currentUsers => 
        currentUsers.map(user => {
          if (user.id !== userId) return user;
          
          const currentDate = new Date();
          const endDate = new Date(currentDate);
          endDate.setDate(endDate.getDate() + planData.daysToAdd);
          
          return {
            ...user,
            plan: planData.plan,
            planDaysRemaining: planData.daysToAdd,
            planStartDate: currentDate.toISOString().split('T')[0],
            planEndDate: endDate.toISOString().split('T')[0]
          };
        })
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user plan';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    users,
    isLoading,
    error,
    loadUsers,
    updateUserIds,
    updateUserPlan
  };
}