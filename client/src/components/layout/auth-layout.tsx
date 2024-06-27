import { useGetAuthenticatedUser } from "@/context/authenticated-context";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const user = useGetAuthenticatedUser();

  if (user) {
    return <Navigate to="/notes" />;
  } else {
    return (
      <main className="bg-background min-h-screen grid grid-cols-1">
        <div className="container my-auto">
          <div className="my-44">
            <div className="bg-card border border-border rounded-xl lg:grid lg:grid-cols-2 overflow-hidden md:max-w-sm lg:max-w-full mx-auto">
              <div className="relative hidden lg:block lg:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1558865869-c93f6f8482af?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="absolute object-cover inset-0 h-full w-full"
                />
                {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-l from-background from-10% via-violet-900 to-violet-400" /> */}
              </div>
              <div className="lg:col-span-1 py-8 md:py-12 lg:py-16 xl:py-20 px-6 md:px-8 lg:px-12 xl:px-16">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
