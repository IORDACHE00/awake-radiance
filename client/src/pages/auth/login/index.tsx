import LoginForm from "@/components/forms/login-form";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Login to your account</h2>
        <span className="inline-block text-muted-foreground mt-2">
          Enter your email and password below to login into your account.
        </span>
      </div>

      <LoginForm />

      <div className="flex space-x-2 mx-auto">
        <span className="text-sm text-muted-foreground">
          Don’t have an account?
        </span>
        <Link to="/sign-up" className="text-sm text-violet-500 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}
