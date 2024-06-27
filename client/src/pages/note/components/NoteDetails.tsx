import { useGetNote } from "@/api/queries/notes";
import { formatDate } from "@/utils/format-date";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function NoteDetails() {
  const { noteId } = useParams();

  const { data: note, isPending, error } = useGetNote(noteId);

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          There was an error while trying to fetch the note's details. Please
          try again later
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <div className="h-full rounded-3xl border border-foreground/20 flex flex-col gap-14 p-20">
        <div className="flex items-center justify-between">
          <p className="font-normal text-foreground/50">
            Created on {formatDate(note.created_at)}
          </p>
          <p className="font-normal text-foreground/50">
            Last updated {formatDate(note.updated_at)}
          </p>
        </div>

        <h1 className="text-3xl mr-auto max-w-[750px] text-center font-bold text-foreground/95">
          {note.title}
        </h1>

        <p className="text-foreground/80 text-lg">{note.content}</p>
      </div>
    </div>
  );
}
