import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDTO } from "@/types/user.type";
import { toast } from "sonner";
import { signin, signup } from "@/services/auth.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignupForm = () => {
  const [credentials, setCredentials] = useState<UserDTO>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //on envoie la requête de signup avec les identifiants
      await signup(credentials);

      //si il n'y as pas d'erreur au signup on passe au signin
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
      } catch (error) {
        console.log('Error while login !', error)
      }
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
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your credentials below to create an account
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
            Register
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          already have an account?{" "}
          <Link to={`/login`} className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignupForm;