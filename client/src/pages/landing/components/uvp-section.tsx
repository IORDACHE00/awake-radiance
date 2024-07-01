import { Baby, CloudUpload, Dumbbell, History, Plus } from "lucide-react";
import UVPCard from "./uvp-card";
import { Button } from "@/components/ui/button";

const UVP_CONTENT = [
  {
    id: 1,
    title: "Use it everywhere",
    description:
      "Notes are stored in the cloud so you can access them from anywhere, anytime.",
    icon: CloudUpload,
  },
  {
    id: 2,
    title: "Powerful features",
    description: (
      <div>
        The best
        <Button variant="outline" className="mx-1 h-6">
          <span className="font-semibold text-xs">Create note</span>
          <Plus className="w-4 h-4 ml-1" />
        </Button>
        button in the world. It's so good, you'll want to click it twice.
      </div>
    ),
    icon: Dumbbell,
  },
  {
    id: 3,
    title: "Go back in time",
    description:
      "Notes are backed up with every change so you can see what you noted last week, last month, or last year.",
    icon: History,
  },
  {
    id: 4,
    title: "Easy to use",
    description:
      "Just open and write - no inerruptions, no heavy-lifting, no steep learning curve. Enjoy an easy experience.",
    icon: Baby,
  },
];

export default function UVPSection() {
  return (
    <div className="mt-40">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
        {UVP_CONTENT.map((content, index) => (
          <UVPCard key={index} metadata={content} />
        ))}
      </div>
    </div>
  );
}
