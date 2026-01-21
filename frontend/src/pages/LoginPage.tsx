import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center md:p-2">
      <div className="flex w-full max-w-sm flex-col">
        <LoginForm />
      </div>
    </div>
  )
}