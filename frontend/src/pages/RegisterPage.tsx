
import { SignupForm } from "@/components/auth/signup-form"

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center md:p-2">
      <div className="flex w-full max-w-sm flex-col">
        <SignupForm />
      </div>
    </div>
  )
}
