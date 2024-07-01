import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="bg-foreground mt-40">
      <div className="container py-24 flex flex-col items-center w-full gap-12">
        <div className="flex flex-col items-center gap-3">
          <p className="text-background text-4xl text-center">
            Ready to get started?
          </p>
          <span className="text-background/50 text-center">
            Try AwakeRadiance for free, and take your notes to the next level.
          </span>
        </div>

        <Link
          to="/login"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-background text-foreground hover:bg-background/80 active:bg-background/75 transition-colors duration-300 ease-in-out group"
        >
          <p>Try for free</p>
          <ArrowRight className="inline-block w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
        </Link>
      </div>
    </div>
  );
}
