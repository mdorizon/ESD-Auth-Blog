import { getAll } from "@/services/post.service";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostType } from "@/types/post.type";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostArchive = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

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

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {paginatedPosts.map((post: PostType) => (
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

      <Tabs defaultValue="page-1" className="pt-8 p-4">
        <TabsList>
          {[...Array(totalPages)].map((_, index) => (
            <TabsTrigger
              key={index}
              value={`page-${index + 1}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              Page {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PostArchive;