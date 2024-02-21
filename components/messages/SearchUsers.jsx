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
  const router = useRouter();
  // searchUser function
  async function searchUser() {
    const data = await searchUserByName(search);
    setResult(data);
  }
  // using debounce to create latency in search
  const debounce = useDebounce(searchUser, 200);

  useEffect(() => {
    debounce();
  }, [search]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (result) {
        router.push(`/messages/${result[0]._id}`);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search User</DialogTitle>
          <input
            autoFocus
            className="w-full rounded-lg border-none outline-none text-lg p-1   bg-secondary "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            onKeyDown={handleSearch}
          />
          {result?.length > 0 ? (
            <div className="flex transition-all duration-300 ease-in-out  flex-col gap-2 mt-2 p-1">
              {result?.slice(0, 3)?.map((item) => (
                <UserCard
                  key={item._id}
                  name={item.name}
                  email={item.email}
                  id={item._id}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg text-muted-foreground mt-4 text-center">
              No User Found
            </p>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUsers;
