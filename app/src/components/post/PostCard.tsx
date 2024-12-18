import { PostType } from "@/types/post.type";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const PostCard = ({ title, content, image_path, user_id, created_at, id, username }: PostType) => {
  const placeholderImage = "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <Card className="rounded-md overflow-hidden w-full flex flex-col max-w-md mx-auto shadow-md">
      <img src={image_path ? image_path : placeholderImage} alt={title} className="w-full h-64 object-cover" />
      <CardContent className="p-4">
        <CardDescription className="text-sm font-semibold mb-2">Par {username} - {new Date(created_at).toLocaleDateString()}</CardDescription>
        <CardTitle className="text-lg font-bold mb-2">{title}</CardTitle>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={`/post/${id}`} className="w-full">
          <Button variant="outline" className="w-full">Voir le post</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default PostCard;