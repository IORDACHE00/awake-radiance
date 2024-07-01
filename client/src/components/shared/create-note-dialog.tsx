import { useNoteStore } from "@/store/notes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "../ui/sheet";
import CreateNoteForm from "../forms/create-note";

export default function CreateNoteDialog() {
  const { isCreateOpen, toggleCreate } = useNoteStore();

  if (!isCreateOpen) return null;

  return (
    <Sheet open={isCreateOpen} onOpenChange={toggleCreate}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetDescription className="text-foreground">
            <div className="flex flex-col text-start space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Create note</h2>
                <span className="inline-block text-muted-foreground mt-2">
                  Enter your note details below to create a new note.
                </span>
              </div>

              <CreateNoteForm toggleDialog={toggleCreate} />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
