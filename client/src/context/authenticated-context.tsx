import React from "react";
import { Navigate } from "react-router-dom";
import { TUser } from "@/schema/user";
import { useGetMe } from "@/api/queries/auth";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const AuthenticatedContext = React.createContext<TUser | null>(null);

export function useGetAuthenticatedUser() {
  return React.useContext(AuthenticatedContext);
}

export default function AuthenticatedContextProvider({ children }: Props) {
  const { data, isPending, error } = useGetMe();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <AuthenticatedContext.Provider value={{ ...data! }}>
      {children}
    </AuthenticatedContext.Provider>
  );
}
