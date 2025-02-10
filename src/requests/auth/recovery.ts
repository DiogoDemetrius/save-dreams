export async function requestRecovery(body: object): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/auth/recovery`, {
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

    return await response.text();
  } catch (error) {
    throw error;
  }
}
