import { useGetAuthenticatedUser } from "@/context/authenticated-context";
import { cn } from "@/lib/utils";
import { NotepadText } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import getLetters from "@/utils/get-letters";
import { Button } from "../ui/button";
import { useLogoutUser } from "@/api/queries/auth";

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

  const navigate = useNavigate();

  const { mutateAsync: logoutUser, isPending } = useLogoutUser();

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

        <Separator />

        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="destructive"
            onClick={() => {
              logoutUser();

              navigate("/login");
            }}
            disabled={isPending}
          >
            Logout
          </Button>
        </div>

        <div className="p-4 rounded-md border w-full mt-2 flex items-center gap-2">
          <Avatar className="bg-foreground">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/micah/svg?seed=${email}`}
              alt="User's profile image"
            />
            <AvatarFallback>{getLetters(username)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="font-semibold">{username}</p>
            <p className="font-light text-sm text-black dark:text-foreground/70 underline">
              {email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
