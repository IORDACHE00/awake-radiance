import { useGetNotes } from "@/api/queries/notes";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import NoteCard from "../../components/NoteCard";

export default function NewNotes() {
  const location = useLocation();
  const searchValue = new URLSearchParams(location.search).get("search") || "";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
  } = useGetNotes({
    search: searchValue,
    isArchived: false,
  });

  const { lastPositionRef } = useIntersectionObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isPending) {
    return (
      <div className="w-full mt-52 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-52 flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    );
  }

  const notesList = data.pages.flat();

  return (
    <>
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(370px,1fr))] gap-4 my-8">
        {notesList.map((entity) => (
          <NoteCard key={entity.id} metadata={entity} />
        ))}
      </div>

      <div
        ref={lastPositionRef}
        className="w-full flex items-center justify-center"
      >
        {isFetchingNextPage ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : null}
        {!notesList.length ? "No notes found" : null}
      </div>
    </>
  );
}
