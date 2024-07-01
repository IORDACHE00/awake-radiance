import getLetters from "@/utils/get-letters";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutUser } from "@/api/queries/auth";
import { useNavigate } from "react-router-dom";
import { ChevronsUpDown, Loader2, LogOut } from "lucide-react";

type Props = {
  metadata: {
    email: string;
    username: string;
  };
};

export default function SidebarUserMenu({ metadata }: Props) {
  const { email, username } = metadata;

  const navigate = useNavigate();

  const { mutateAsync: logoutUser, isPending } = useLogoutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="p-2 rounded-md border w-full mt-2 flex items-center">
          <div className="flex items-center gap-3">
            <Avatar className="bg-foreground">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${email}`}
                alt="User's profile image"
              />
              <AvatarFallback>{getLetters(username)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
              <p className="font-semibold">{username}</p>
              <p className="font-light text-sm text-black dark:text-foreground/70 underline">
                {email}
              </p>
            </div>
          </div>

          <ChevronsUpDown className="ml-auto text-foreground/70" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        sideOffset={10}
        className="rounded-xl text-foreground/60 font-light min-w-[230px]"
      >
        <DropdownMenuItem
          className="flex items-center justify-between px-4 py-2 hover:cursor-pointer bg-red-500/10 text-red-500/70 focus:bg-red-500/20 focus:text-red-500"
          onClick={() => {
            logoutUser();

            navigate("/");
          }}
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-xs font-normal">Log out</p>
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}

            <LogOut className="w-4 h-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
