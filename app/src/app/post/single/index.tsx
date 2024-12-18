import { getOneById } from "@/services/post.service";
import { PostType } from "@/types/post.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const PostSinglePage = () => {
  const [post, setPost] = useState<PostType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          throw new Error("id not found");
        }

        const data = await getOneById(parseInt(id));
        setPost(data);
      } catch (e) {
        // @ts-expect-error because error is unknown type
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  if (!post) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[94vh] m-8">
      <div className="flex-none md:w-1/2 h-64 md:h-full">
        <img
          src={post.image_path || "https://via.placeholder.com/800x600?text=No+Image"}
          alt={post.title}
          className="w-full h-[94vh] object-cover rounded-lg max-h-screen"
        />
      </div>
      <div className="flex flex-col justify-between p-6 md:w-1/2">
        <div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div
            className="prose max-w-none ql-editor"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content)
            }}
          />
        </div>
        <div className="mt-6 md:mt-0">
          <p className="text-sm text-gray-500">
            Par <span className="font-semibold">{post.username}</span>
          </p>
          <p className="text-sm text-gray-400">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostSinglePage;