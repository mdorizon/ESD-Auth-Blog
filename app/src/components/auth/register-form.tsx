import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserDTO } from "@/types/user.type"
import { signin, signup } from "@/services/auth.service"
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [credentials, setCredentials] = useState<UserDTO>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(credentials);

      try {
        const token = await signin(credentials)
        if (token == undefined) {
          return;
        }

        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', token);

        setCredentials({
          username: "",
          email: "",
          password: "",
        })

        navigate('/')
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Auth Blog account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={credentials.email}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  value={credentials.username}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  onChange={handleChange} 
                  id="password" 
                  name="password" 
                  type="password"
                  value={credentials.password}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="re-password">Repeat password</Label>
                <Input 
                  onChange={handleChange} 
                  id="re-password" 
                  name="re-password" 
                  type="password"
                  // value={credentials.password}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="text-center text-sm">
                already have an account?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/serverroom.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
