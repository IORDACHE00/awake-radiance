import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchInput() {
  const location = useLocation();
  const navigate = useNavigate();

  function setString(value: string) {
    const searchParams = new URLSearchParams(location.search);
    const currentSearchParam = searchParams.get("search");

    if (currentSearchParam === value) return;

    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl, { replace: true });
  }

  const searchValue = new URLSearchParams(location.search).get("search") || "";
  const [search, setSearch] = React.useState<string>(searchValue);

  useDebounce(
    () => {
      setString(search);
    },
    500,
    [search]
  );

  return (
    <Input
      className="max-w-[650px]"
      placeholder="Looking for something?"
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      }}
    />
  );
}
