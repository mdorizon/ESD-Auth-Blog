import { useState } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    // Appeler une API ou effectuer une logique pour sauvegarder le mot de passe
    console.log("Password updated:", { currentPassword, newPassword });

    // Réinitialiser le formulaire après la soumission réussie
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground">
          Ensure your account is secure by changing your password regularly.
        </p>
      </div>
      <Separator className="my-6" />
      <form
        className="space-y-4 max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full">
          Save Password
        </Button>
      </form>
    </div>
  );
};

export default Security;