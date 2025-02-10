interface AuthSuccessfully {
  auth_token: string;
}

export async function makeLogin(body: object): Promise<AuthSuccessfully> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
