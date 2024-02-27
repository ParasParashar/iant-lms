"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { searchUserByName } from "@/actions/user.actions";
import { useDebounce } from "@/hooks/useDebounce";
import UserCard from "./UserCard";
import { useRouter } from "next/navigation";

const SearchUsers = ({ children }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Debounce search function
  const debounceSearch = useDebounce(searchUser, 200);

  // Handle search on input change
  useEffect(() => {
    debounceSearch();
  }, [search]);

  // Search user function
  async function searchUser() {
    const data = await searchUserByName(search);
    setResult(data);
  }

  // Handle search on Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && result.length > 0) {
      router.push(`/messages/${result[0]._id}`);
      handleClickTrigger();
      setSearch("");
    }
  };
  const handleClickTrigger = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <input
            autoFocus
            className="w-full rounded-lg border-none outline-none text-lg p-1 bg-secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            onKeyDown={handleSearchKeyPress}
          />
          {result?.length > 0 ? (
            <div className="flex transition-all duration-300 ease-in-out  flex-col gap-2 mt-2 p-1">
              {result?.slice(0, 3)?.map((item) => (
                <UserCard
                  key={item._id}
                  name={item.name}
                  email={item.email}
                  id={item._id}
                  handleClickTrigger={handleClickTrigger}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-muted-foreground p-2 mt-4 text-center">
              No User Found
            </p>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUsers;
