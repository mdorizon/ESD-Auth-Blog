import { UserDTO } from "@/types/user.type";

const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (credentials: UserDTO) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  const data = await response.json()

  return data
}

export const signin = async (credentials: UserDTO) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data.access_token
}

export const accountData = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const response = await fetch(`${API_URL}/auth`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return data.user;
};