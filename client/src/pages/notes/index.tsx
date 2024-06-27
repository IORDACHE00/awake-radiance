import SearchInput from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNoteStore } from "@/store/notes";
import { Plus } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Notes() {
  const { toggleCreate } = useNoteStore();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Your notes</h1>
          <span className="text-sm opacity-70 font-light">
            These are all the notes you've created.
          </span>
        </div>

        <Button
          onClick={toggleCreate}
          variant="default"
          className="items-center flex gap-2"
        >
          <span className="font-semibold">Create note</span>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4 pt-8">
        <SearchInput />
        <Separator />
        <EntityList />
      </div>
    </div>
  );
}

function EntityList() {
  const { pathname } = useLocation();

  return (
    <Tabs defaultValue={pathname} className="mt-4">
      <div className="flex justify-between">
        <TabsList className="gap-1">
          <Link to="/notes">
            <TabsTrigger value="/notes">New</TabsTrigger>
          </Link>

          <Link to="/notes/archived">
            <TabsTrigger value="/notes/archived">Archived</TabsTrigger>
          </Link>
        </TabsList>
      </div>
      <TabsContent value={pathname}>
        <Outlet />
      </TabsContent>
    </Tabs>
  );
}
