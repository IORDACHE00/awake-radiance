import { Link } from "react-router-dom";
import AwakeRadianceLight from "@/assets/awake-radiance-light.png";
import AwakeRadianceDark from "@/assets/awake-radiance-dark.png";
import { useTheme } from "@/components/theme-provider";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { theme } = useTheme();
  console.log(theme);

  return (
    <div className="mt-12 flex flex-col items-center w-full gap-32">
      <div className="flex flex-col items-center gap-3">
        <FeatureBadge />

        <h1 className="text-4xl md:text-5xl font-semibold text-center mt-4">
          The place to write{" "}
          <span className="font-bold text-violet-500 underline">your</span>{" "}
          thoughts.
        </h1>
        <h2 className="text-center text-foreground/60 text-sm md:text-lg max-w-[500px] font-normal">
          AwakeRadiance, a simple, secure, and private place to write your
          thoughts and ideas.
        </h2>

        <div className="mt-8">
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:bg-foreground/80 active:bg-foreground/75 transition-colors duration-300 ease-in-out group"
          >
            <p>Try for free</p>
            <ArrowRight className="inline-block w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 ease-in-out" />
          </Link>
        </div>
      </div>

      <div>
        <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img
            src={theme === "dark" ? AwakeRadianceLight : AwakeRadianceDark}
            alt="Hero Section"
            className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureBadge() {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-foreground/10 text-xs rounded-full">
      <span className="font-semibold">Used by at least 2 people</span>
    </div>
  );
}
