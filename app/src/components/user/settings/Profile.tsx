import { useState } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { updateUsername } from "@/services/user.service";
import { toast } from "sonner";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // change username
  const handleUsernameSubmit = async () => {
    if (!username) {
      return;
    }
    try {
      await updateUsername(username)
      toast.success('Username changed !')
    } catch {
      toast.error('Error while changing username')
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageSubmit = () => {
    if (profileImage) {
      console.log("Profile image updated:", profileImage);

      // Réinitialise l'image après la soumission
      setProfileImage(null);
      setPreviewImage(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile details and picture.
        </p>
      </div>
      <Separator className="my-6" />
      {/* Formulaire pour changer la photo de profil */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Profile Picture</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No Image
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-muted file:text-muted-foreground"
            />
          </div>
        </div>
        <Button
          onClick={handleImageSubmit}
          disabled={!profileImage}
          className="mt-2"
        >
          Save Picture
        </Button>
      </div>
      <Separator className="my-6" />
      <form
        className="space-y-4 max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleUsernameSubmit();
        }}
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-primary focus:border-primary"
            placeholder="Enter your new username"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Save Username
        </Button>
      </form>
    </div>
  );
};

export default Profile;