import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDTO } from "@/types/user.type";
import { toast } from "sonner";
import { signin } from "@/services/auth.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SigninForm = () => {
  const [credentials, setCredentials] = useState<UserDTO>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //on envoie la requête de signin avec les identifiants et on récupère le token
      const token = await signin(credentials)
      // si on ne reçois pas de token il y a un problème et on stoppe le code ici
      if (token == undefined) {
        return;
      }

      // enregistrement du token dans le local storage
      localStorage.setItem('access_token', token);
      
      // reset des champs du formulaire
      setCredentials({
        username: "",
        password: "",
      })
      
      // retour à la page d'accueil
      navigate('/')
      // actualisation de toutes la page pour mettre à jour tout les components s'éxécutant seulement quand un compte est connecté
      window.location.reload()
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to connect to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">username</Label>
            <Input
              onChange={handleChange}
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input 
              onChange={handleChange} 
              id="password" 
              name="password" 
              type="password"
              value={credentials.password}
              required 
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          don't have an account?{" "}
          <Link to={`/register`} className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SigninForm;