import { useDeleteNote, useUpdateNote } from "@/api/queries/notes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { TNote } from "@/schema/note";
import { useNoteStore } from "@/store/notes";
import { Ellipsis, ExternalLink, FilePenLine, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function NoteControlMenu({ metadata }: { metadata: TNote }) {
  const [checked, setChecked] = React.useState(metadata.is_archived);

  const { toggleUpdate, setNote } = useNoteStore();

  const { mutateAsync: updateNote, isPending: isUpdating } = useUpdateNote();

  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNote();

  const { toast } = useToast();

  async function handleStatus() {
    try {
      setChecked(!checked);

      await updateNote({
        noteId: metadata.id,
        payload: {
          is_archived: !checked,
        },
      });

      toast({
        title: "Note status updated",
        description: `Note status has been updated successfully.`,
      });
    } catch (error) {
      setChecked(checked);

      toast({
        title: "Oh no!",
        description: "An error occurred while updating the note status.",
        variant: "destructive",
      });
    }
  }

  async function handleDelete() {
    try {
      await deleteNote(metadata.id);

      toast({
        title: "Note deleted",
        description: "Note has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Oh no!",
        description: "An error occurred while deleting the note.",
        variant: "destructive",
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-foreground/10 hover:border-foreground/20 p-1 rounded-full">
        <Ellipsis className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={10}
        align="end"
        className="rounded-xl text-foreground/60 font-light min-w-[230px]"
      >
        <div className="flex items-center justify-between px-4 py-2 text-xs font-normal">
          <span>Archived</span>

          <Switch
            checked={checked}
            onCheckedChange={handleStatus}
            disabled={isUpdating}
          />
        </div>

        <DropdownMenuItem
          className="flex items-center justify-between px-4 py-2 hover:cursor-pointer"
          onClick={() => {
            setNote(metadata);

            toggleUpdate();
          }}
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-xs font-normal">Update note</p>

            <FilePenLine className="w-4 h-4" />
          </div>
        </DropdownMenuItem>

        <Link to={`/note/view/${metadata.id}`} target="_blank">
          <DropdownMenuItem className="flex items-center justify-between px-4 py-2 hover:cursor-pointer">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-normal">View note in new page</p>

              <ExternalLink className="w-4 h-4" />
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center justify-between px-4 py-2 hover:cursor-pointer mt-1 bg-red-500/10 text-red-500/70 focus:bg-red-500/20 focus:text-red-500"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-xs font-normal">Delete note</p>

            <Trash2 className="w-4 h-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
