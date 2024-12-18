import { getAll } from "@/services/post.service";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostType } from "@/types/post.type";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAll();
        setPosts(data);
      } catch (e) {
        // @ts-expect-error because error is unknown type
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post: PostType) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          image_path={post.image_path}
          created_at={post.created_at}
          user_id={post.user_id}
          id={post.id}
          username={post.username}
        />
      ))}
    </div>
  );
};

export default PostArchive;