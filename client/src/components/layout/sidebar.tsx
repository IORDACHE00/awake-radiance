import { useGetAuthenticatedUser } from "@/context/authenticated-context";
import { cn } from "@/lib/utils";
import { NotepadText } from "lucide-react";
import { NavLink } from "react-router-dom";
import SidebarUserMenu from "../shared/sidebar-user-menu";

const topLinks = [
  {
    id: 1,
    label: "My notes",
    path: "/notes",
    icon: <NotepadText />,
  },
];

export default function Sidebar() {
  const { username, email } = useGetAuthenticatedUser();

  return (
    <aside className="fixed top-[60px] z-30 hidden h-[calc(100vh-60px)] w-full shrink-0 md:sticky md:block p-4 border-r">
      <div className="h-full flex flex-col">
        <div className="flex flex-col gap-2 mb-4 flex-1">
          {topLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                cn([
                  "flex items-center justify-between text-foreground/80 text-sm font-normal p-2 rounded-md transition-all duration-150 ease-in border border-transparent",
                  "focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-1 focus-visible:outline-white",
                  isActive
                    ? "bg-foreground/5 backdrop-blur-lg text-foreground font-bold"
                    : "hover:bg-foreground/5",
                ])
              }
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <p>{link.label}</p>
              </div>
            </NavLink>
          ))}
        </div>

        <SidebarUserMenu metadata={{ email, username }} />
      </div>
    </aside>
  );
}
