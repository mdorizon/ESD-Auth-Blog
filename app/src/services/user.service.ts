const API_URL = import.meta.env.VITE_API_URL;

export const updateUser = async (username?: string, profile_picture?: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const response = await fetch(`${API_URL}/users`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, profile_picture }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const uploadProfilePicture = async (file: File) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const formData = new FormData();
  formData.append("profile_picture", file);

  const response = await fetch(`${API_URL}/users/upload-picture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading profile picture");
  }

  const data = await response.json();
  return data.profile_picture;
};