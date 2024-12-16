const API_URL = import.meta.env.VITE_API_URL;

export const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();

  return data;
};