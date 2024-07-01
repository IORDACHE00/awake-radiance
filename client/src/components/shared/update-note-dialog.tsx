import { useNoteStore } from "@/store/notes";
import UpdateNoteForm from "../forms/update-note";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "../ui/sheet";

export default function UpdateNoteDialog() {
  const { isUpdateOpen, note, toggleUpdate } = useNoteStore();

  if (!isUpdateOpen) return null;

  return (
    <Sheet open={isUpdateOpen} onOpenChange={toggleUpdate}>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetDescription className="text-foreground">
            <div className="flex flex-col text-start space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Update note</h2>
                <span className="inline-block text-muted-foreground mt-2">
                  Fill in the form below to update the note.
                </span>
              </div>

              <UpdateNoteForm toggleDialog={toggleUpdate} metadata={note} />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
