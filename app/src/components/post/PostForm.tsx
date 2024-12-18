import { create, getOneById, update } from "@/services/post.service";
import { PostDTO } from "@/types/post.type";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import { useUserPosts } from "@/context/UserPostsProvider";

const PostForm = () => {
  const { fetchUserData } = useUserPosts();
  const [credentials, setCredentials] = useState<PostDTO>({
    title: "",
    content: "",
    image_path: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchPostData();
    else setIsLoading(false); // Pas en mode édition
  }, [id]);

  const fetchPostData = async () => {
    try {
      if (id) {
        const postData = await getOneById(parseInt(id));
        if (postData) {
          setCredentials({
            title: postData.title || "",
            content: postData.content || "",
            image_path: postData.image_path || ""
          });
        }
      }
    } catch (e) {
      console.log("Error fetching post data!", e);
    } finally {
      setIsLoading(false); // Les données sont chargées
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("You have to be connected to create a new post!");
      }

      let response;
      if (id) {
        response = await update(credentials, parseInt(id));
      } else {
        response = await create(credentials);
      }

      setCredentials({
        title: "",
        content: "",
        image_path: ""
      });

      if (id) {
        toast.success("Le post a bien été modifié");
        navigate(`/post/${id}`);
      } else {
        navigate(`/post/${response.id}`);
        toast.success("Le post a bien été créé");
      }
      fetchUserData();
    } catch (e) {
      // @ts-expect-error because error is unknown type
      toast.error(e.toString());
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleContentChange = (value: string) => {
    setCredentials({
      ...credentials,
      content: value
    });
  };

  if (isLoading) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <Card className="mx-auto min-w-96 max-w-7xl">
      <CardHeader>
        <CardTitle className="text-2xl">{id ? "Modify a post" : "Create a new post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleChange}
              id="title"
              name="title"
              type="text"
              value={credentials.title}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              value={credentials.content}
              onChange={handleContentChange}
              className="h-72"
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  [{ header: [1, 2, 3, false] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"]
                ]
              }}
            />
          </div>
          <div className="grid gap-2 mt-12">
            <Label htmlFor="image">Image</Label>
            <Input
              onChange={handleChange}
              id="image"
              name="image_path"
              type="url"
              value={credentials.image_path}
              placeholder="https://"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {id ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;