import RegisterForm from "@/components/forms/register-form";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Register a new account</h2>
        <span className="inline-block text-muted-foreground mt-2">
          Enter your username, email and password below to register a new
          account.
        </span>
      </div>

      <RegisterForm />

      <div className="flex space-x-2 mx-auto">
        <span className="text-sm text-muted-foreground">
          Already have an account?
        </span>
        <Link to="/login" className="text-sm text-violet-500 font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}
