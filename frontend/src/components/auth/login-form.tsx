import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const loginSchema = z.object({
  username: z.string().min(5, "Usernames must have at least 5 characters."),
  password: z.string().min(6, "Passwords must be longer than 6 characters."),
})

type LoginFormValue = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signin } = useAuthStore()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async ( data: LoginFormValue ) => {
    try {
      const { username, password } = data
      const resData = await signin(username, password)
      if (resData?.Ec === 0) {
        navigate("/")
        toast.success(resData?.Mes)
      } else {
        toast.warning(resData?.Mes)
      }
    } catch (error) {
      console.error("!!! Error Sign Up: ", error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card className="border-border">
        <CardHeader className="text-center">
          <img src="/logo.png" alt="" className="w-12 m-auto h-12" />
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your username account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="block text-sm">Username</Label>
              <Input id="username" type="text" placeholder="myusername1" {...register("username")}></Input>
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="block text-sm">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" {...register("password")}></Input>
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <Button className="mt-6" type="submit" disabled={isSubmitting}>
              Login
            </Button>

            <div className="text-center text-sm">
              You don't have account yet? {" "}
              <a href="/register" className="underline underline-offset-2 font-medium">Register</a>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="px-4 text-center text-balance text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-2 *:[a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
