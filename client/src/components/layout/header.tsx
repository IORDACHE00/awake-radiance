import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 h-[60px] z-50 w-full backdrop-blur border-b">
      <div className="h-full px-4 flex items-center justify-between">
        <p className="font-semibold text-body">
          AwakeRadiance <span className="font-light">Assignment</span>
        </p>

        <ModeToggle />
      </div>
    </header>
  );
}
