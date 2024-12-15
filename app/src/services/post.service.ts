import { PostDTO } from "@/types/post.type";

const API_URL = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();
  return data;
};

export const getAllPostsByUser = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  };

  const response = await fetch(`${API_URL}/posts/user`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();
  return data;
};

export const getOneById = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();

  return data;
};

export const create = async (post: PostDTO) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  };

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();
  return data;
};

export const update = async (post: PostDTO, id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  };

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();
  return data;
};

export const remove = async (id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  };

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  };

  const data = await response.json();
  return data;
};