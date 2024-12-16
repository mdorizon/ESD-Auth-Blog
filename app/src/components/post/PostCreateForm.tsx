import { create } from "@/services/post.service";
import { PostDTO } from "@/types/post.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const PostCreateForm = () => {
  const [credentials, setCredentials] = useState<PostDTO>({
    title: "",
    content: "",
    image_path: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('You have to be connected to create a new post !');
      }

      const response = await create(credentials)

      setCredentials({
        title: "",
        content: "",
        image_path: ""
      })

      toast.success('Le post à bien été créer')
      navigate(`/post/${response.id}`)
    } catch (e) {
      // @ts-expect-error because error is unknown type
      toast.error(e.toString())
      return;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return (
    <Card className="mx-auto min-w-96 max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Create a new post</CardTitle>
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
            <div className="flex items-center">
              <Label htmlFor="content">Content</Label>
            </div>
            <Textarea 
              id="content"
              onChange={handleChange}
              name="content"
              value={credentials.content}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="image">image</Label>
            </div>
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
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PostCreateForm;