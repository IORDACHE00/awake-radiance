import { Separator } from "@/components/ui/separator";
import { TNote } from "@/schema/note";
import { formatDate } from "@/utils/format-date";
import NoteControlMenu from "./NoteControlMenu";

export default function NoteCard({ metadata }: { metadata: TNote }) {
  return (
    <div
      className={`min-h-[250px] border border-foreground/10 p-4 rounded-xl flex flex-col gap-4 hover:cursor-pointer hover:border-foreground/20 transition-all duration-300 ease-in-out 
      `}
    >
      <div className="flex items-center justify-between">
        <p className="uppdercase text-xs font-normal text-foreground/50">
          {formatDate(metadata.updated_at)}
        </p>

        <NoteControlMenu metadata={metadata} />
      </div>

      <p className="font-bold line-clamp-1 text-lg">{metadata.title}</p>

      <Separator />

      <p className="text-sm text-foreground/70 line-clamp-[7]">
        {metadata.content}
      </p>
    </div>
  );
}
