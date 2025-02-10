import { useAuthStore } from '../../stores/authStore';

interface GetSuccessfully {
  username: string;
  email: string;
  gravatar_url: string;
  profile: {
    id: string;
    createdAt: string;
    subscription: string;
    restantDays: number;
  };
}

export async function getUserData(token: string): Promise<GetSuccessfully> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/client/userData`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
