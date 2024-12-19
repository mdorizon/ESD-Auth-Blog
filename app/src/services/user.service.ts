const API_URL = import.meta.env.VITE_API_URL;

export const updateUsername = async (username: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const response = await fetch(`${API_URL}/user/username`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
};