import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout() {
  return (
    <div className="relative min-h-screen flex-col antialiased">
      <Header />
      <main className="flex-1">
        <div className="flex-1 items-start md:grid md:grid-cols-[300px_minmax(0,1fr)]">
          <Sidebar />
          <main className="relative lg:gap-10 xl:grid-cols-[1fr_300px] h-full p-4">
            <Outlet />
          </main>
        </div>
      </main>
    </div>
  );
}
