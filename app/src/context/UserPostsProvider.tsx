import { createContext, useContext, useState, useCallback } from "react";
import { getAllPostsByUser } from "@/services/post.service";
import { PostType } from "@/types/post.type";

// Définir le type des données du contexte
interface UserPostsContextType {
  userPosts: PostType[];
  fetchUserData: () => Promise<void>;
}

// Initialiser le contexte avec le type correct (et null par défaut)
const UserPostsContext = createContext<UserPostsContextType | null>(null);

export const UserPostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]); // Tapez correctement si possible

  const fetchUserData = useCallback(async () => {
    try {
      const posts = await getAllPostsByUser();
      setUserPosts(posts);
    } catch (e) {
      console.error("Error fetching user posts", e);
    }
  }, []);

  return (
    <UserPostsContext.Provider value={{ userPosts, fetchUserData }}>
      {children}
    </UserPostsContext.Provider>
  );
};

export const useUserPosts = () => {
  const context = useContext(UserPostsContext);

  if (!context) {
    throw new Error("useUserPosts must be used within a UserPostsProvider");
  }

  return context;
};