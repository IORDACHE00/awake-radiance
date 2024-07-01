import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <div className="h-[60px] border-b border-foreground/10 sticky top-0 left-0 z-55 backdrop-blur-md bg-background/30">
      <div className="container flex items-center justify-between h-full">
        <Link to="/" className="text-sm font-bold">
          awake <span className="font-normal">radiance</span>
        </Link>

        <div className="flex items-center justify-between gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:bg-foreground/80 active:bg-foreground/75 transition-colors duration-300 ease-in-out"
          >
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
}
