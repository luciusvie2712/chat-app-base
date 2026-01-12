import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z.object({
  firstname: z.string().min(1, "Required information"),
  lastname: z.string().min(1, "Required information"),
  username: z.string().min(5, "Usernames must have at least 5 characters."),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Passwords must be longer than 6 characters.")
})

type RegisterFormValue = z.infer<typeof registerSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: RegisterFormValue) => {
    /// api
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card className="overflow-hidden border-border gap-4">
        <CardHeader className="text-center">
          <img src="/logo.png" alt="" className="w-12 m-auto h-12" />
          <CardTitle className="text-xl">Create Crush account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Firstname & Lastname */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="firstname" className="block text-sm">
                  First Name
                </Label>
                <Input id="firstname" type="text" {...register("firstname")}></Input>
                {errors.firstname && (
                  <p className="text-destructive text-sm">{errors.firstname.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastname" className="block text-sm">
                  Last Name
                </Label>
                <Input id="lastname" type="text" {...register("lastname")}></Input>
                {errors.lastname && (
                  <p className="text-destructive text-sm">{errors.lastname.message}</p>
                )}
              </div>
            </div>
            {/* Username */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="block text-sm">Username</Label>
              <Input id="username" type="text" placeholder="myusername1" {...register("username")}></Input>
              {errors.username && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="block text-sm">Email</Label>
              <Input id="email" type="email" placeholder="example@gmail.com" {...register("email")}></Input>
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="block text-sm">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" {...register("password")}></Input>
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              Register
            </Button>

            <div className="text-center text-sm">
              You already have an account? {" "}
              <a href="/login" className="underline underline-offset-2 font-medium">Login</a>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="px-4 text-sm text-center text-balance *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offset-2">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
